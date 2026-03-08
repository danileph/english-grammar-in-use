"use client";

import { useEffect, useMemo, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { cn } from "@/lib/utils";

type SentenceGapInputProps = {
  id: string;
  parts: string[];
  gapMarkers: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function normalizeShellPart(value: string) {
  return value.replace(/\s*\^\s*/g, " ");
}

export function buildSentenceShell(parts: string[], gapMarkers: string[]) {
  return parts.reduce((acc, part, index) => {
    const marker = index < gapMarkers.length ? gapMarkers[index] : "";
    return `${acc}${normalizeShellPart(part)}${marker}`;
  }, "");
}

export function buildSentenceWithoutGap(parts: string[]) {
  return parts.map(normalizeShellPart).join("");
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

type Segment = { type: "locked" | "editable"; text: string };

function isSentenceDelimiter(char: string) {
  return char === "." || char === "," || char === ":" || char === ";" || char === "?" || char === "!";
}

function findSentenceStart(text: string, index: number) {
  let cursor = index - 1;
  while (cursor >= 0 && !isSentenceDelimiter(text[cursor])) {
    cursor -= 1;
  }

  let start = cursor + 1;
  while (start < text.length && text[start] === " ") {
    start += 1;
  }

  return start;
}

function findSentenceEnd(text: string, index: number) {
  let cursor = index;
  while (cursor < text.length && !isSentenceDelimiter(text[cursor])) {
    cursor += 1;
  }

  if (cursor < text.length) {
    cursor += 1;
  }

  while (cursor < text.length && text[cursor] === " ") {
    cursor += 1;
  }

  return cursor;
}

function buildEditableSentenceRanges(text: string, gapMarkers: string[]) {
  const ranges: Array<{ start: number; end: number }> = [];
  let searchFrom = 0;

  for (const marker of gapMarkers) {
    if (!marker) {
      continue;
    }

    const markerIndex = text.indexOf(marker, searchFrom);
    if (markerIndex < 0) {
      continue;
    }

    const sentenceStart = findSentenceStart(text, markerIndex);
    const sentenceEnd = findSentenceEnd(text, markerIndex + marker.length);
    ranges.push({ start: sentenceStart, end: sentenceEnd });
    searchFrom = markerIndex + marker.length;
  }

  if (ranges.length === 0) {
    return ranges;
  }

  ranges.sort((a, b) => a.start - b.start);
  const merged: Array<{ start: number; end: number }> = [ranges[0]];

  for (let index = 1; index < ranges.length; index += 1) {
    const current = ranges[index];
    const last = merged[merged.length - 1];

    if (current.start <= last.end) {
      last.end = Math.max(last.end, current.end);
      continue;
    }

    merged.push(current);
  }

  return merged;
}

function buildSegments(templateText: string, ranges: Array<{ start: number; end: number }>): Segment[] {
  const segments: Segment[] = [];
  let cursor = 0;

  for (const range of ranges) {
    if (range.start > cursor) {
      segments.push({ type: "locked", text: templateText.slice(cursor, range.start) });
    }

    segments.push({ type: "editable", text: templateText.slice(range.start, range.end) });
    cursor = range.end;
  }

  if (cursor < templateText.length) {
    segments.push({ type: "locked", text: templateText.slice(cursor) });
  }

  return segments;
}

function extractEditableChunksFromText(currentText: string, segments: Segment[]) {
  const chunks: string[] = [];
  let cursor = 0;

  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];

    if (segment.type === "locked") {
      if (!currentText.startsWith(segment.text, cursor)) {
        return null;
      }

      cursor += segment.text.length;
      continue;
    }

    let nextLockedText: string | null = null;
    for (let nextIndex = index + 1; nextIndex < segments.length; nextIndex += 1) {
      const nextSegment = segments[nextIndex];
      if (nextSegment.type === "locked") {
        nextLockedText = nextSegment.text;
        break;
      }
    }

    if (!nextLockedText) {
      chunks.push(currentText.slice(cursor));
      cursor = currentText.length;
      continue;
    }

    const nextLockedIndex = currentText.indexOf(nextLockedText, cursor);
    if (nextLockedIndex < 0) {
      return null;
    }

    chunks.push(currentText.slice(cursor, nextLockedIndex));
    cursor = nextLockedIndex;
  }

  if (cursor !== currentText.length) {
    return null;
  }

  return chunks;
}

function rebuildTextFromChunks(segments: Segment[], chunks: string[]) {
  let nextText = "";
  let editableIndex = 0;

  for (const segment of segments) {
    if (segment.type === "locked") {
      nextText += segment.text;
      continue;
    }

    nextText += chunks[editableIndex] ?? "";
    editableIndex += 1;
  }

  return nextText;
}

type ExtractGapValueParams = {
  value: string;
  parts: string[];
  gapMarkers: string[];
};

export function extractGapValuesFromSentence({ value, parts, gapMarkers }: ExtractGapValueParams) {
  const shellWithMarker = buildSentenceShell(parts, gapMarkers);
  const shellWithoutMarker = buildSentenceWithoutGap(parts);
  const trimmedValue = value.trim();
  const blankCount = gapMarkers.length;

  if (!trimmedValue) {
    return Array.from({ length: blankCount }, () => "");
  }

  if (trimmedValue === shellWithMarker.trim() || trimmedValue === shellWithoutMarker.trim()) {
    return Array.from({ length: blankCount }, () => "");
  }

  const normalizedParts = parts.map(normalizeShellPart);
  const answers: string[] = [];
  let cursor = 0;

  for (let index = 0; index < blankCount; index += 1) {
    const partBefore = normalizedParts[index] ?? "";
    const partAfter = normalizedParts[index + 1] ?? "";
    const marker = gapMarkers[index] ?? "";

    if (partBefore) {
      const beforeIndex = value.indexOf(partBefore, cursor);
      if (beforeIndex >= 0) {
        cursor = beforeIndex + partBefore.length;
      }
    }

    let nextBoundary = value.length;
    if (partAfter) {
      const afterIndex = value.indexOf(partAfter, cursor);
      if (afterIndex >= 0) {
        nextBoundary = afterIndex;
      }
    }

    answers.push(value.slice(cursor, nextBoundary).replace(marker, "").trim());
    cursor = nextBoundary;
  }

  return answers;
}

export function SentenceGapInput({
  id,
  parts,
  gapMarkers,
  value,
  onChange,
  className,
}: SentenceGapInputProps) {
  const firstMarker = gapMarkers[0] ?? "..........";
  const shellWithMarker = buildSentenceShell(parts, gapMarkers);
  const shellWithoutMarker = buildSentenceWithoutGap(parts);
  const editableRanges = useMemo(() => buildEditableSentenceRanges(shellWithMarker, gapMarkers), [gapMarkers, shellWithMarker]);
  const segments = useMemo(() => buildSegments(shellWithMarker, editableRanges), [editableRanges, shellWithMarker]);
  const controlledValue = value || shellWithMarker;
  const lastEmittedValueRef = useRef(controlledValue);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        horizontalRule: false,
        hardBreak: false,
      }),
    ],
    content: `<p>${escapeHtml(controlledValue)}</p>`,
    editorProps: {
      attributes: {
        id,
        spellcheck: "false",
        autocomplete: "off",
        class:
          "h-auto min-h-8 w-full rounded-lg border-none bg-transparent px-2 py-1 text-md text-foreground/90 outline-none whitespace-pre-wrap break-words",
      },
    },
    onFocus: ({ editor: currentEditor }) => {
      const plainText = currentEditor.getText();
      const gapStartIndex = plainText.indexOf(firstMarker);

      if (gapStartIndex >= 0) {
        currentEditor.commands.setTextSelection({
          from: gapStartIndex + 1,
          to: gapStartIndex + firstMarker.length + 1,
        });
        return;
      }

      if (plainText.trim() === shellWithoutMarker.trim()) {
        const fallbackStart = editableRanges[0]?.start ?? 0;
        currentEditor.commands.setTextSelection(fallbackStart + 1);
      }
    },
    onUpdate: ({ editor: currentEditor }) => {
      const currentText = currentEditor.getText();
      const editableChunks = extractEditableChunksFromText(currentText, segments);

      if (!editableChunks) {
        currentEditor.commands.setContent(`<p>${escapeHtml(lastEmittedValueRef.current)}</p>`, { emitUpdate: false });
        return;
      }

      const nextValue = rebuildTextFromChunks(segments, editableChunks);

      if (nextValue !== currentText) {
        currentEditor.commands.setContent(`<p>${escapeHtml(nextValue)}</p>`, { emitUpdate: false });
      }

      lastEmittedValueRef.current = nextValue;
      if (nextValue !== controlledValue) {
        onChange(nextValue);
      }
    },
    onBlur: ({ editor: currentEditor }) => {
      if (currentEditor.getText().trim() === shellWithoutMarker.trim()) {
        onChange(shellWithMarker);
      }
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (lastEmittedValueRef.current === controlledValue) {
      return;
    }

    const editorText = editor.getText();
    if (editorText !== controlledValue) {
      editor.commands.setContent(`<p>${escapeHtml(controlledValue)}</p>`, { emitUpdate: false });
    }
  }, [controlledValue, editor]);

  return (
    <div
      className={cn(
        "h-auto min-h-8 w-full max-w-full rounded-lg border-none bg-transparent text-md transition-all hover:shadow-[0_0_0_2px_rgba(34,197,94,0.2)] focus-within:shadow-[0_0_0_2px_rgba(34,197,94,0.32)]",
        className,
      )}
    >
      <EditorContent editor={editor} />
    </div>
  );
}
