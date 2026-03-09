import { UnitMetaBar } from "@/components/unit-meta-bar";

type PracticeHeaderProps = {
  topic: string;
  title: string;
  estimatedMinutes: number;
  primaryActionHref: string;
  primaryActionLabel: string;
  primaryActionIcon?: "back";
  onPrimaryActionClick?: () => void;
  secondaryActionLabel?: string;
  secondaryActionIcon?: "bookmark" | "restart";
  onSecondaryActionClick?: () => void;
  secondaryActionDisabled?: boolean;
};

export function PracticeHeader({
  topic,
  title,
  estimatedMinutes,
  primaryActionHref,
  primaryActionLabel,
  primaryActionIcon,
  onPrimaryActionClick,
  secondaryActionLabel,
  secondaryActionIcon,
  onSecondaryActionClick,
  secondaryActionDisabled,
}: PracticeHeaderProps) {
  return (
    <header className="border-b pb-4">
      <p className="text-sm font-medium text-muted-foreground">{topic}</p>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <UnitMetaBar
        className="mt-4"
        estimatedMinutes={estimatedMinutes}
        primaryActionHref={primaryActionHref}
        primaryActionLabel={primaryActionLabel}
        primaryActionIcon={primaryActionIcon}
        onPrimaryActionClick={onPrimaryActionClick}
        secondaryActionLabel={secondaryActionLabel}
        secondaryActionIcon={secondaryActionIcon}
        onSecondaryActionClick={onSecondaryActionClick}
        secondaryActionDisabled={secondaryActionDisabled}
      />
    </header>
  );
}
