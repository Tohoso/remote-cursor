import { create } from 'zustand';
import { ProjectStatus, Track, Blocker, ActivityLogEntry, ConnectionStatus } from '@common/types';

interface DashboardState {
  projectStatus: ProjectStatus | null;
  connectionStatus: ConnectionStatus;
  logs: ActivityLogEntry[];

  // Actions
  setProjectStatus: (status: ProjectStatus) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  addLog: (log: ActivityLogEntry) => void;
  clearLogs: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  projectStatus: null,
  connectionStatus: 'disconnected',
  logs: [],

  setProjectStatus: (status) => set({ projectStatus: status }),
  setConnectionStatus: (status) => set({ connectionStatus: status }),
  addLog: (log) => set((state) => ({ logs: [log, ...state.logs].slice(0, 100) })),
  clearLogs: () => set({ logs: [] }),
}));

// Selectors
export const useTracks = () => useDashboardStore((state) => state.projectStatus?.tracks ?? []);
export const useBlockers = () => useDashboardStore((state) => state.projectStatus?.blockers ?? []);
export const useOverallProgress = () => useDashboardStore((state) => ({
  completed: state.projectStatus?.completedTasks ?? 0,
  total: state.projectStatus?.totalTasks ?? 0,
  status: state.projectStatus?.overallStatus ?? 'Unknown',
}));
