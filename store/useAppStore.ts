"use client";

import { create } from "zustand";

import type { ProgressStatus, ProgressUnitRecord } from "@/types";

type AppStore = {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
  progressByUnitId: ProgressUnitRecord;
  setUser: (user: AppStore["user"]) => void;
  hydrateProgress: (progressByUnitId: ProgressUnitRecord) => void;
  fetchProgress: () => Promise<void>;
  updateProgress: (
    unitId: string,
    patch: { status?: ProgressStatus; accuracy?: number | null },
  ) => Promise<void>;
};

export const useAppStore = create<AppStore>((set, get) => ({
  user: null,
  progressByUnitId: {},
  setUser: (user) => set({ user }),
  hydrateProgress: (progressByUnitId) => set({ progressByUnitId }),
  fetchProgress: async () => {
    const response = await fetch("/api/progress", { cache: "no-store" });
    if (!response.ok) {
      return;
    }

    const data: {
      progress: Array<{
        unitId: string;
        status: ProgressStatus;
        accuracy: number | null;
      }>;
    } = await response.json();

    const mapped = Object.fromEntries(
      data.progress.map((item) => [
        item.unitId,
        {
          status: item.status,
          accuracy: item.accuracy,
        },
      ]),
    ) as ProgressUnitRecord;

    set({ progressByUnitId: mapped });
  },
  updateProgress: async (unitId, patch) => {
    const previous = get().progressByUnitId[unitId] ?? {
      status: "NOT_STARTED" as const,
      accuracy: null,
    };

    const next = {
      status: patch.status ?? previous.status,
      accuracy: patch.accuracy ?? previous.accuracy,
    };

    set((state) => ({
      progressByUnitId: {
        ...state.progressByUnitId,
        [unitId]: next,
      },
    }));

    const response = await fetch("/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        unitId,
        status: next.status,
        accuracy: next.accuracy,
      }),
    });

    if (!response.ok) {
      set((state) => ({
        progressByUnitId: {
          ...state.progressByUnitId,
          [unitId]: previous,
        },
      }));
    }
  },
}));
