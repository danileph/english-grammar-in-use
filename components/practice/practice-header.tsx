import { UnitMetaBar } from "@/components/unit-meta-bar";

type PracticeHeaderProps = {
  topic: string;
  title: string;
  estimatedMinutes: number;
  primaryActionHref: string;
  primaryActionLabel: string;
  primaryActionIcon?: "back";
  onPrimaryActionClick?: () => void;
};

export function PracticeHeader({
  topic,
  title,
  estimatedMinutes,
  primaryActionHref,
  primaryActionLabel,
  primaryActionIcon,
  onPrimaryActionClick,
}: PracticeHeaderProps) {
  return (
    <header className="border-b pb-4">
      <p className="text-sm font-medium text-muted-foreground">{topic}</p>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <UnitMetaBar
        className="mt-4"
        estimatedMinutes={estimatedMinutes}
        learnersLabel="6k learners"
        primaryActionHref={primaryActionHref}
        primaryActionLabel={primaryActionLabel}
        primaryActionIcon={primaryActionIcon}
        onPrimaryActionClick={onPrimaryActionClick}
      />
    </header>
  );
}
