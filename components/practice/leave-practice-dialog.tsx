import { Button } from "@/components/ui/button";

type LeavePracticeDialogProps = {
  isOpen: boolean;
  onStay: () => void;
  onLeave: () => void;
};

export function LeavePracticeDialog({ isOpen, onStay, onLeave }: LeavePracticeDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="leave-practice-title"
      aria-describedby="leave-practice-description"
    >
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-lg">
        <h2 id="leave-practice-title" className="text-lg font-semibold text-foreground">
          Leave this exercise?
        </h2>
        <p id="leave-practice-description" className="mt-2 text-sm text-muted-foreground">
          Your current answers are not saved yet. If you leave now, your progress on this exercise can be lost.
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onStay}>
            Stay here
          </Button>
          <Button onClick={onLeave}>Leave</Button>
        </div>
      </div>
    </div>
  );
}
