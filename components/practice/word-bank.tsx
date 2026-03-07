import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type WordBankProps = {
  label: string;
  words: string[];
  usedWords?: Set<string>;
};

export function WordBank({ label, words, usedWords }: WordBankProps) {
  return (
    <div className="rounded-xl border bg-muted/45 p-2.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-primary/25 px-4 py-2 text-sm font-semibold uppercase tracking-[0.1em] text-primary">
          {label}
        </span>
        {words.map((word) => {
          const isUsed = usedWords?.has(word.toLowerCase()) ?? false;

          return (
            <span
              key={word}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-base transition-colors",
                isUsed
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800 line-through decoration-1 opacity-80"
                  : "bg-background text-foreground/85",
              )}
            >
              {isUsed ? <Check className="h-3.5 w-3.5 shrink-0" /> : null}
              <span>{word}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
