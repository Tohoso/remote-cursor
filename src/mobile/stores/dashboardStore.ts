import { create } from 'zustand';
import { Project, Log } from '../data/mockData';

interface DashboardState {
  projects: Project[];
  logs: Log[];
  setProjects: (projects: Project[]) => void;
  updateProject: (project: Project) => void;
  addLog: (log: Log) => void;
  setLogs: (logs: Log[]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  projects: [],
  logs: [],

  setProjects: (projects) => set({ projects }),

  updateProject: (updatedProject) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === updatedProject.id ? updatedProject : p
      ),
    })),

  addLog: (log) =>
    set((state) => ({
      logs: [log, ...state.logs].slice(0, 50), // Keep last 50 logs
    })),

  setLogs: (logs) => set({ logs }),
}));
