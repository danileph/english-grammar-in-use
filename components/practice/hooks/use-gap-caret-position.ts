import { useCallback } from "react";

type GapCaretParams = {
  input: HTMLInputElement;
  prefix: string;
  suffix: string;
};

export function useGapCaretPosition() {
  return useCallback(({ input, prefix, suffix }: GapCaretParams) => {
    const inputValue = input.value;

    // Prefer placing the caret immediately before the suffix, otherwise after prefix.
    const suffixIndex = suffix.length > 0 ? inputValue.indexOf(suffix) : -1;
    const fallbackPosition = Math.min(prefix.length, inputValue.length);
    const caretPosition = suffixIndex >= 0 ? suffixIndex : fallbackPosition;

    requestAnimationFrame(() => {
      input.setSelectionRange(caretPosition, caretPosition);
    });
  }, []);
}
