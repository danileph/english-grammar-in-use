import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type WordBankProps = {
  words: string[];
  usedWords?: Set<string>;
};

export function WordBank({ words, usedWords }: WordBankProps) {
  return (
    <div className="rounded-xl border bg-muted/45 p-2">
      <div className="flex flex-wrap items-center gap-1.5">
        {words.map((word) => {
          const isUsed = usedWords?.has(word.toLowerCase()) ?? false;

          return (
            <span
              key={word}
              className={cn(
                "inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-sm transition-colors",
                isUsed
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800 line-through decoration-1 opacity-80"
                  : "bg-background text-foreground/85",
              )}
            >
              {isUsed ? <Check className="h-3 w-3 shrink-0" /> : null}
              <span>{word}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
