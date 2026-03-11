import { Card } from "@/components/ui/card";
import type { UnitContentSection } from "@/lib/unit-content";

type UnitContentSectionCardProps = {
  section: UnitContentSection;
};

function renderInlineBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    if (
      part.startsWith("*") &&
      part.endsWith("*") &&
      !part.startsWith("**") &&
      !part.endsWith("**")
    ) {
      return <em key={`${part}-${index}`}>{part.slice(1, -1)}</em>;
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export function UnitContentSectionCard({ section }: UnitContentSectionCardProps) {
  const headlineToneClassName: Record<"rose" | "amber" | "slate", string> = {
    rose: "bg-rose-50 text-stone-950 shadow-[0_10px_20px_-18px_rgba(120,53,15,0.65)]",
    amber: "bg-amber-50 text-stone-950 shadow-[0_10px_20px_-18px_rgba(120,53,15,0.65)]",
    slate: "bg-slate-100 text-stone-950 shadow-[0_10px_20px_-18px_rgba(51,65,85,0.65)]",
  };

  return (
    <section id={section.id} className="scroll-mt-24">
      <Card className="space-y-4 rounded-2xl border p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-muted/50 text-sm font-semibold">
              {section.label}
            </span>
            <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
          </div>
          {section.tag ? (
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
              {section.tag}
            </span>
          ) : null}
        </div>

        <div className="space-y-3 text-muted-foreground">
          {section.blocks.map((block, index) => {
            if (block.type === "paragraph") {
              const isParenthetical = block.text.startsWith("(") && block.text.endsWith(")");

              return (
                <p key={`${section.id}-paragraph-${index}`} className={isParenthetical ? "italic" : undefined}>
                  {renderInlineBold(block.text)}
                </p>
              );
            }

            if (block.type === "examples") {
              return (
                <ul key={`${section.id}-examples-${index}`} className="space-y-2 pl-2">
                  {block.items.map((item, itemIndex) => (
                    <li key={`${section.id}-examples-${index}-${itemIndex}`} className="flex items-start gap-3 text-foreground">
                      <span className="mt-0.5 text-base leading-none text-emerald-500">○</span>
                      <span>{renderInlineBold(item)}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            if (block.type === "connector") {
              return (
                <p key={`${section.id}-connector-${index}`} className="italic">
                  {renderInlineBold(block.text)}
                </p>
              );
            }

            if (block.type === "headline-grid") {
              return (
                <div
                  key={`${section.id}-headline-grid-${index}`}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  {block.items.map((item, itemIndex) => (
                    <div
                      key={`${section.id}-headline-grid-${index}-${itemIndex}`}
                      className={`w-fit max-w-full -rotate-1 rounded-sm px-4 py-3 font-serif text-xl font-bold uppercase tracking-tight ${headlineToneClassName[item.tone ?? "amber"]}`}
                    >
                      {renderInlineBold(item.text)}
                    </div>
                  ))}
                </div>
              );
            }

            return (
              <aside
                key={`${section.id}-note-${index}`}
                className="rounded-xl border border-emerald-300 bg-emerald-50/50 px-4 py-3 text-foreground"
              >
                {block.text.startsWith("Also:") ? (
                  <>
                    <span className="font-semibold text-emerald-700">Also:</span>
                    {` `}
                    {renderInlineBold(block.text.slice("Also:".length).trim())}
                  </>
                ) : (
                  renderInlineBold(block.text)
                )}
              </aside>
            );
          })}
        </div>
      </Card>
    </section>
  );
}
