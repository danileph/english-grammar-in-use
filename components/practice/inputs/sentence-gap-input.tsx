"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { cn } from "@/lib/utils";

type SentenceGapInputProps = {
  id: string;
  prefix: string;
  suffix: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  gapMarker?: string;
};

export function normalizeShellPart(value: string) {
  return value.replace(/\s*\^\s*/g, " ");
}

export function buildSentenceShell(prefix: string, suffix: string, gapMarker: string) {
  return `${normalizeShellPart(prefix)}${gapMarker}${normalizeShellPart(suffix)}`;
}

export function buildSentenceWithoutGap(prefix: string, suffix: string) {
  return `${normalizeShellPart(prefix)}${normalizeShellPart(suffix)}`;
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

type ExtractGapValueParams = {
  value: string;
  prefix: string;
  suffix: string;
  gapMarker: string;
};

export function extractGapValueFromSentence({ value, prefix, suffix, gapMarker }: ExtractGapValueParams) {
  const shellWithMarker = buildSentenceShell(prefix, suffix, gapMarker);
  const shellWithoutMarker = buildSentenceWithoutGap(prefix, suffix);
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  if (trimmedValue === shellWithMarker.trim() || trimmedValue === shellWithoutMarker.trim()) {
    return "";
  }

  const normalizedPrefix = normalizeShellPart(prefix);
  const normalizedSuffix = normalizeShellPart(suffix);
  let extractedValue = value;

  if (normalizedPrefix && extractedValue.startsWith(normalizedPrefix)) {
    extractedValue = extractedValue.slice(normalizedPrefix.length);
  }

  if (normalizedSuffix && extractedValue.endsWith(normalizedSuffix)) {
    extractedValue = extractedValue.slice(0, -normalizedSuffix.length);
  }

  return extractedValue.replace(gapMarker, "").trim();
}

export function SentenceGapInput({
  id,
  prefix,
  suffix,
  value,
  onChange,
  className,
  gapMarker = "..........",
}: SentenceGapInputProps) {
  const shellWithMarker = buildSentenceShell(prefix, suffix, gapMarker);
  const shellWithoutMarker = buildSentenceWithoutGap(prefix, suffix);
  const controlledValue = value || shellWithMarker;

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
          "h-auto min-h-8 w-full rounded-lg border-none bg-background px-2 py-1 text-md text-foreground/90 outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] whitespace-pre-wrap break-words",
      },
    },
    onFocus: ({ editor: currentEditor }) => {
      const plainText = currentEditor.getText();
      const gapStartIndex = plainText.indexOf(gapMarker);

      if (gapStartIndex >= 0) {
        currentEditor.commands.setTextSelection({
          from: gapStartIndex + 1,
          to: gapStartIndex + gapMarker.length + 1,
        });
        return;
      }

      if (plainText.trim() === shellWithoutMarker.trim()) {
        const gapCaretIndex = normalizeShellPart(prefix).length;
        currentEditor.commands.setTextSelection(gapCaretIndex + 1);
      }
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getText());
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

    const editorText = editor.getText();
    if (editorText !== controlledValue) {
      editor.commands.setContent(`<p>${escapeHtml(controlledValue)}</p>`, { emitUpdate: false });
    }
  }, [controlledValue, editor]);

  return (
    <div
      className={cn(
        "h-auto min-h-8 w-full max-w-full rounded-lg border-none bg-background text-md shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]",
        className,
      )}
    >
      <EditorContent editor={editor} />
    </div>
  );
}
