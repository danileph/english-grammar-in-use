"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { PracticeMockData } from "@/lib/mock-practice";

import { ExerciseCard } from "@/components/practice/exercise-card";
import { ExerciseProgressSidebar } from "@/components/practice/exercise-progress-sidebar";
import { LeavePracticeDialog } from "@/components/practice/leave-practice-dialog";
import { PracticeBottomBar } from "@/components/practice/practice-bottom-bar";
import { PracticeHeader } from "@/components/practice/practice-header";

type PracticePageLayoutProps = {
  data: PracticeMockData;
  topic: string;
  title: string;
  estimatedMinutes: number;
  primaryActionHref: string;
  primaryActionLabel: string;
  primaryActionIcon?: "back";
};

export function PracticePageLayout({
  data,
  topic,
  title,
  estimatedMinutes,
  primaryActionHref,
  primaryActionLabel,
  primaryActionIcon,
}: PracticePageLayoutProps) {
  const router = useRouter();
  const [checkAnswersSignal, setCheckAnswersSignal] = useState(0);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<{ type: "href"; href: string } | { type: "back" } | null>(
    null,
  );
  const allowNavigationRef = useRef(false);

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

  return (
    <>
      <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
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
          />

          <ExerciseCard
            exerciseNumber={data.steps[0]?.id}
            instruction={data.instruction}
            practiceSectionLabel={data.practiceSectionLabel}
            wordBankLabel={data.wordBankLabel}
            words={data.wordBank}
            items={data.exerciseItems}
            checkAnswersSignal={checkAnswersSignal}
          />

          <PracticeBottomBar
            current={data.currentExerciseNumber}
            total={data.totalExercises}
            onCheckAnswers={() => setCheckAnswersSignal((current) => current + 1)}
          />
        </div>

        <div className="h-(100%+24px) -my-6 py-2 md:justify-self-end md:border-l md:-mr-6">
          <div className="md:sticky md:top-24 md:h-[calc(100vh-135px)] md:w-[240px] md:overflow-y-auto">
            <ExerciseProgressSidebar
              completed={data.completedExercises}
              total={data.totalExercises}
              steps={data.steps}
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
