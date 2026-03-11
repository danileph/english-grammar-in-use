"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { PracticeExerciseStep, PracticeMockData } from "@/lib/mock-practice";

import { ExerciseCard } from "@/components/practice/exercise-card";
import { ExerciseProgressSidebar } from "@/components/practice/exercise-progress-sidebar";
import { LeavePracticeDialog } from "@/components/practice/leave-practice-dialog";
import { PracticeBottomBar } from "@/components/practice/practice-bottom-bar";
import { PracticeHeader } from "@/components/practice/practice-header";

type PracticePageLayoutProps = {
  unitId: string;
  data: PracticeMockData;
  topic: string;
  title: string;
  estimatedMinutes: number;
  primaryActionHref: string;
  primaryActionLabel: string;
  primaryActionIcon?: "back";
  initialCompletedExerciseIds: string[];
  initialAttemptsByExerciseId: Record<string, { answersByItemId: Record<string, string>; isChecked: boolean }>;
};

export function PracticePageLayout({
  unitId,
  data,
  topic,
  title,
  estimatedMinutes,
  primaryActionHref,
  primaryActionLabel,
  primaryActionIcon,
  initialCompletedExerciseIds,
  initialAttemptsByExerciseId,
}: PracticePageLayoutProps) {
  const router = useRouter();
  const stepsWithExercises = useMemo(
    () =>
      data.steps
        .map((step) => ({
          step,
          exercise: data.exercises.find((exercise) => exercise.id === step.id),
        }))
        .filter((entry): entry is { step: PracticeExerciseStep; exercise: PracticeMockData["exercises"][number] } =>
          Boolean(entry.exercise),
        ),
    [data.exercises, data.steps],
  );
  const initialActiveExerciseId = useMemo(() => {
    const firstIncompleteStep = stepsWithExercises.find((entry) => !initialCompletedExerciseIds.includes(entry.step.id));
    return firstIncompleteStep?.step.id ?? stepsWithExercises[0]?.step.id;
  }, [initialCompletedExerciseIds, stepsWithExercises]);

  const [activeExerciseId, setActiveExerciseId] = useState(initialActiveExerciseId ?? "");
  const [checkAnswersSignal, setCheckAnswersSignal] = useState(0);
  const [exerciseRenderNonce, setExerciseRenderNonce] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [canCheckAnswers, setCanCheckAnswers] = useState(false);
  const [attemptsByExerciseId, setAttemptsByExerciseId] = useState(initialAttemptsByExerciseId);
  const activeExercise = useMemo(
    () => stepsWithExercises.find((entry) => entry.step.id === activeExerciseId)?.exercise ?? stepsWithExercises[0]?.exercise,
    [activeExerciseId, stepsWithExercises],
  );
  const activeExerciseIndex = useMemo(
    () => stepsWithExercises.findIndex((entry) => entry.step.id === (activeExercise?.id ?? "")),
    [activeExercise?.id, stepsWithExercises],
  );
  const [exerciseProgress, setExerciseProgress] = useState({
    completedElements: 0,
    totalElements: activeExercise?.items.length ?? 0,
  });
  const [completedExerciseIds, setCompletedExerciseIds] = useState(() => new Set(initialCompletedExerciseIds));
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<{ type: "href"; href: string } | { type: "back" } | null>(
    null,
  );
  const allowNavigationRef = useRef(false);
  const completedCount = completedExerciseIds.size;
  const totalCount = stepsWithExercises.length;
  const sidebarSteps = useMemo<PracticeExerciseStep[]>(
    () => {
      return stepsWithExercises.map(({ step }, index) => {
        const isCompleted = completedExerciseIds.has(step.id);
        const isCurrent = !isCompleted && index === activeExerciseIndex;

        return {
          ...step,
          status: isCompleted ? "completed" : isCurrent ? "current" : "upcoming",
        };
      });
    },
    [activeExerciseIndex, completedExerciseIds, stepsWithExercises],
  );
  const handleWordBankUsageChange = useCallback((allWordsUsed: boolean) => {
    setCanCheckAnswers(allWordsUsed);
  }, []);
  const handleExerciseProgressChange = useCallback(
    (progress: { completedElements: number; totalElements: number }) => {
      setExerciseProgress(progress);
    },
    [],
  );

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (allowNavigationRef.current || event.defaultPrevented) {
        return;
      }

      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]");

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if ((anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) {
        return;
      }

      const nextUrl = new URL(anchor.href, window.location.href);
      const currentUrl = new URL(window.location.href);
      const isSameDocument =
        nextUrl.origin === currentUrl.origin &&
        nextUrl.pathname === currentUrl.pathname &&
        nextUrl.search === currentUrl.search &&
        nextUrl.hash === currentUrl.hash;
      const isHashOnlyChange =
        nextUrl.origin === currentUrl.origin &&
        nextUrl.pathname === currentUrl.pathname &&
        nextUrl.search === currentUrl.search &&
        nextUrl.hash !== currentUrl.hash;

      if (isSameDocument || isHashOnlyChange) {
        return;
      }

      event.preventDefault();
      setPendingNavigation({ type: "href", href: nextUrl.href });
      setIsLeaveDialogOpen(true);
    };

    document.addEventListener("click", onDocumentClick, true);

    return () => {
      document.removeEventListener("click", onDocumentClick, true);
    };
  }, []);

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (allowNavigationRef.current) {
        return;
      }

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  useEffect(() => {
    window.history.pushState({ practiceGuard: true }, "", window.location.href);

    const onPopState = () => {
      if (allowNavigationRef.current) {
        return;
      }

      window.history.pushState({ practiceGuard: true }, "", window.location.href);
      setPendingNavigation({ type: "back" });
      setIsLeaveDialogOpen(true);
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const handleLeaveConfirm = () => {
    allowNavigationRef.current = true;
    setIsLeaveDialogOpen(false);
    const nextNavigation = pendingNavigation;
    setPendingNavigation(null);

    if (nextNavigation?.type === "back") {
      window.history.back();
      return;
    }

    const fallbackHref = new URL(primaryActionHref, window.location.href).href;
    const destination = nextNavigation?.type === "href" ? nextNavigation.href : fallbackHref;
    const destinationUrl = new URL(destination, window.location.href);

    if (destinationUrl.origin === window.location.origin) {
      router.push(`${destinationUrl.pathname}${destinationUrl.search}${destinationUrl.hash}`);
      return;
    }

    window.location.assign(destinationUrl.href);
  };

  const handleAnswersChecked = useCallback(
    async (result: {
      exerciseId: string;
      correctItems: number;
      totalItems: number;
      accuracy: number;
      answersByItemId: Record<string, string>;
    }) => {
      const response = await fetch("/api/exercise-attempts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unitId,
          exerciseId: result.exerciseId,
          correctItems: result.correctItems,
          totalItems: result.totalItems,
          answersByItemId: result.answersByItemId,
        }),
      });

      if (!response.ok) {
        return;
      }

      const payload: { isCompleted: boolean } = await response.json();
      setAttemptsByExerciseId((current) => ({
        ...current,
        [result.exerciseId]: {
          answersByItemId: result.answersByItemId,
          isChecked: true,
        },
      }));

      if (!payload.isCompleted) {
        return;
      }

      setCompletedExerciseIds((current) => {
        const next = new Set(current);
        next.add(result.exerciseId);
        return next;
      });
    },
    [unitId],
  );

  const handleRestartExercise = useCallback(async () => {
    if (isResetting || !activeExercise) {
      return;
    }

    const shouldReset = window.confirm(`Restart exercise ${activeExercise.id} from scratch?`);
    if (!shouldReset) {
      return;
    }

    setIsResetting(true);

    try {
      const response = await fetch("/api/exercise-attempts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ unitId, exerciseId: activeExercise.id }),
      });

      if (!response.ok) {
        return;
      }

      setCompletedExerciseIds((current) => {
        const next = new Set(current);
        next.delete(activeExercise.id);
        return next;
      });
      setAttemptsByExerciseId((current) => {
        const next = { ...current };
        delete next[activeExercise.id];
        return next;
      });
      setCanCheckAnswers(false);
      setCheckAnswersSignal(0);
      setExerciseProgress({
        completedElements: 0,
        totalElements: activeExercise.items.length,
      });
      setExerciseRenderNonce((current) => current + 1);
      router.refresh();
    } finally {
      setIsResetting(false);
    }
  }, [activeExercise, isResetting, router, unitId]);

  return (
    <>
      <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_232px]">
        <div className="space-y-5">
          <PracticeHeader
            topic={topic}
            title={title}
            estimatedMinutes={estimatedMinutes}
            primaryActionHref={primaryActionHref}
            primaryActionLabel={primaryActionLabel}
            primaryActionIcon={primaryActionIcon}
            onPrimaryActionClick={() => {
              setPendingNavigation({ type: "href", href: new URL(primaryActionHref, window.location.href).href });
              setIsLeaveDialogOpen(true);
            }}
            secondaryActionLabel={isResetting ? "Restarting..." : "Restart Exersice"}
            secondaryActionIcon="restart"
            onSecondaryActionClick={handleRestartExercise}
            secondaryActionDisabled={isResetting}
          />

          {activeExercise ? (
            <ExerciseCard
              key={`${activeExercise.id}-${exerciseRenderNonce}`}
              exerciseId={activeExercise.id}
              exerciseNumber={activeExercise.id}
              instruction={activeExercise.instruction}
              practiceSectionLabel={activeExercise.practiceSectionLabel}
              wordBankLabel={activeExercise.wordBankLabel}
              words={activeExercise.wordBank}
              items={activeExercise.items}
              checkAnswersSignal={checkAnswersSignal}
              initialAnswersByItemId={attemptsByExerciseId[activeExercise.id]?.answersByItemId}
              initialIsChecked={Boolean(attemptsByExerciseId[activeExercise.id]?.isChecked)}
              onWordBankUsageChange={handleWordBankUsageChange}
              onExerciseProgressChange={handleExerciseProgressChange}
              onAnswersChecked={handleAnswersChecked}
            />
          ) : null}

          <PracticeBottomBar
            current={activeExerciseIndex >= 0 ? activeExerciseIndex + 1 : 1}
            total={stepsWithExercises.length}
            progressCompleted={exerciseProgress.completedElements}
            progressTotal={exerciseProgress.totalElements}
            canCheckAnswers={canCheckAnswers}
            onCheckAnswers={() => {
              if (!canCheckAnswers) {
                return;
              }

              setCheckAnswersSignal((current) => current + 1);
            }}
          />
        </div>

        <div className="h-(100%+24px) -my-6 py-2 md:justify-self-end md:border-l md:-mr-6">
          <div className="md:sticky md:top-24 md:h-[calc(100vh-135px)] md:w-[240px] md:overflow-y-auto">
            <ExerciseProgressSidebar
              completed={completedCount}
              total={totalCount}
              steps={sidebarSteps}
              activeStepId={activeExercise?.id}
              onStepSelect={(stepId) => {
                const selectedExercise = stepsWithExercises.find((entry) => entry.step.id === stepId)?.exercise;
                setCanCheckAnswers(false);
                setExerciseProgress({
                  completedElements: 0,
                  totalElements: selectedExercise?.items.length ?? 0,
                });
                setActiveExerciseId(stepId);
              }}
            />
          </div>
        </div>
      </div>
      <LeavePracticeDialog
        isOpen={isLeaveDialogOpen}
        onStay={() => {
          setIsLeaveDialogOpen(false);
          setPendingNavigation(null);
        }}
        onLeave={handleLeaveConfirm}
      />
    </>
  );
}
