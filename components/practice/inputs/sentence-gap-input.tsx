"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useGapCaretPosition } from "@/components/practice/hooks/use-gap-caret-position";

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
  const normalizedPrefix = normalizeShellPart(prefix);
  const normalizedSuffix = normalizeShellPart(suffix);
  const shellWithMarker = buildSentenceShell(prefix, suffix, gapMarker);
  const shellWithoutMarker = buildSentenceWithoutGap(prefix, suffix);
  const inputRef = useRef<HTMLInputElement>(null);
  const [minInputWidth, setMinInputWidth] = useState<number | null>(null);
  const [inputWidth, setInputWidth] = useState<number | null>(null);
  const focusGap = useGapCaretPosition();
  const touchedRef = useRef(false);

  useLayoutEffect(() => {
    if (!inputRef.current) {
      return;
    }

    const input = inputRef.current;
    const styles = window.getComputedStyle(input);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.font = styles.font;

    const letterSpacing = Number.parseFloat(styles.letterSpacing);
    const safeLetterSpacing = Number.isFinite(letterSpacing) ? letterSpacing : 0;
    const horizontalSpace =
      Number.parseFloat(styles.paddingLeft) +
      Number.parseFloat(styles.paddingRight) +
      Number.parseFloat(styles.borderLeftWidth) +
      Number.parseFloat(styles.borderRightWidth) +
      4;

    const measure = (text: string) => {
      if (!text) {
        return 0;
      }

      return context.measureText(text).width + Math.max(0, text.length - 1) * safeLetterSpacing;
    };

    const currentText = value || shellWithMarker;
    const minWidthPx = Math.ceil(measure(shellWithMarker) + horizontalSpace);
    const desiredWidthPx = Math.ceil(measure(currentText) + horizontalSpace);

    setMinInputWidth(minWidthPx);
    setInputWidth(Math.max(minWidthPx, desiredWidthPx));
  }, [shellWithMarker, value]);

  return (
    <Input
      ref={inputRef}
      id={id}
      value={value}
      onChange={(event) => {
        touchedRef.current = true;
        onChange(event.target.value);
      }}
      onFocus={(event) => {
        const isPristine = !touchedRef.current && value === shellWithMarker;
        const shouldRemoveMarker = value === shellWithMarker || value === shellWithoutMarker;

        if (isPristine || shouldRemoveMarker) {
          onChange(shellWithoutMarker);
        }

        focusGap({ input: event.currentTarget, prefix: normalizedPrefix, suffix: normalizedSuffix });
      }}
      onBlur={() => {
        const trimmed = value.trim();
        const hasOnlyShellWithoutGap = trimmed === shellWithoutMarker.trim();

        if (hasOnlyShellWithoutGap) {
          onChange(shellWithMarker);
        }
      }}
      className={cn(
        " h-11 max-w-full rounded-lg border-none bg-background px-2 py-1 h-8 text-md text-foreground/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]",
        className,
      )}
      style={{
        width: inputWidth ? `${inputWidth}px` : undefined,
        minWidth: minInputWidth ? `${minInputWidth}px` : undefined,
        maxWidth: "100%",
      }}
      spellCheck={false}
      autoComplete="off"
    />
  );
}
