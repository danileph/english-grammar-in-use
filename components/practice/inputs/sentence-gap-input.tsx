"use client";

import { useRef } from "react";

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

export function buildSentenceShell(prefix: string, suffix: string, gapMarker: string) {
  return `${prefix}${gapMarker}${suffix}`;
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
  const shellWithoutMarker = `${prefix}${suffix}`;
  const focusGap = useGapCaretPosition();
  const touchedRef = useRef(false);

  return (
    <Input
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

        focusGap({ input: event.currentTarget, prefix, suffix });
      }}
      onBlur={() => {
        const trimmed = value.trim();
        const hasOnlyShellWithoutGap = trimmed === shellWithoutMarker.trim();

        if (hasOnlyShellWithoutGap) {
          onChange(shellWithMarker);
        }
      }}
      className={cn(
        "h-11 rounded-lg border bg-background px-3 text-base text-foreground/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]",
        className,
      )}
      spellCheck={false}
      autoComplete="off"
    />
  );
}
