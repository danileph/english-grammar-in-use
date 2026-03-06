type WordBankProps = {
  label: string;
  words: string[];
};

export function WordBank({ label, words }: WordBankProps) {
  return (
    <div className="rounded-xl border bg-muted/45 p-2.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-primary/25 px-4 py-2 text-sm font-semibold uppercase tracking-[0.1em] text-primary">
          {label}
        </span>
        {words.map((word) => (
          <span
            key={word}
            className="rounded-md border bg-background px-3 py-1.5 text-base text-foreground/85"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
