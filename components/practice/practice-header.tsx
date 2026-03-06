import { UnitMetaBar } from "@/components/unit-meta-bar";

type PracticeHeaderProps = {
  topic: string;
  title: string;
  estimatedMinutes: number;
  practiceHref: string;
};

export function PracticeHeader({
  topic,
  title,
  estimatedMinutes,
  practiceHref,
}: PracticeHeaderProps) {
  return (
    <header className="border-b pb-4">
      <p className="text-sm font-medium text-muted-foreground">{topic}</p>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <UnitMetaBar
        className="mt-4"
        estimatedMinutes={estimatedMinutes}
        learnersLabel="6k learners"
        practiceHref={practiceHref}
      />
    </header>
  );
}
