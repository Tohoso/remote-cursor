/**
 * Remote Cursor - Shared Type Definitions
 *
 * This file contains all shared type definitions used by both
 * the Mobile App (client) and PC Agent Server (server).
 *
 * @see docs/design/DATA_MODEL.md for detailed specifications
 *
 * TASK-010: Implement all types according to DATA_MODEL.md
 */

// =============================================================================
// Type Aliases (Enums)
// =============================================================================

/**
 * Task status values
 * @see DATA_MODEL.md Section 3
 */
export type TaskStatus = 'done' | 'in_progress' | 'not_started' | 'blocked';

/**
 * Track status values
 * @see DATA_MODEL.md Section 3
 */
export type TrackStatus = 'active' | 'paused' | 'completed';

/**
 * Log level values
 * @see DATA_MODEL.md Section 3
 */
export type LogLevel = 'info' | 'warning' | 'error' | 'success';

// =============================================================================
// Core Interfaces
// =============================================================================

/**
 * Represents the overall project status
 * This is the main payload sent via the `project_status` WebSocket event
 *
 * @see DATA_MODEL.md Section 4.1
 * @see API_SPECIFICATION.md Section 3.2
 *
 * TODO: Implement all properties according to DATA_MODEL.md
 */
export interface ProjectStatus {
  // TODO: Implement
  lastUpdated: string;
  tracks: Track[];
  blockers: Blocker[];
  overallStatus: string;
  completedTasks: number;
  totalTasks: number;
}

/**
 * Represents a development track (e.g., mobile-app, server)
 *
 * @see DATA_MODEL.md Section 4.2
 *
 * TODO: Implement all properties according to DATA_MODEL.md
 */
export interface Track {
  // TODO: Implement
  id: string;
  name: string;
  agent: string;
  status: TrackStatus;
  startedAt: string;
  progress: number;
  completedTasks: number;
  totalTasks: number;
  tasks: Task[];
}

/**
 * Represents an individual task (e.g., TASK-010)
 *
 * @see DATA_MODEL.md Section 4.3
 *
 * TODO: Implement all properties according to DATA_MODEL.md
 */
export interface Task {
  // TODO: Implement
  id: string;
  title: string;
  status: TaskStatus;
  trackId: string;
  startedAt?: string;
  completedAt?: string;
  duration?: number;
  prNumber?: number;
  prUrl?: string;
  activityLog?: ActivityLogEntry[];
}

/**
 * Represents a blocker that is preventing task progress
 *
 * @see DATA_MODEL.md Section 4.4
 *
 * TODO: Implement all properties according to DATA_MODEL.md
 */
export interface Blocker {
  // TODO: Implement
  id: string;
  taskId: string;
  reason: string;
  blockedSince: string;
  impactedTasks: string[];
  resolved: boolean;
  resolvedAt?: string;
}

/**
 * Represents a single entry in the activity log
 *
 * @see DATA_MODEL.md Section 4.5
 *
 * TODO: Implement all properties according to DATA_MODEL.md
 */
export interface ActivityLogEntry {
  // TODO: Implement
  id: string;
  timestamp: string;
  source: string;
  level: LogLevel;
  message: string;
  taskId?: string;
  metadata?: Record<string, unknown>;
}

// =============================================================================
// WebSocket Event Payloads
// =============================================================================

/**
 * Payload for the `send_instruction` event (Client -> Server)
 *
 * @see API_SPECIFICATION.md Section 3.3
 */
export interface SendInstructionPayload {
  instruction: string;
  context?: {
    blockerId?: string;
    taskId?: string;
    [key: string]: unknown;
  };
}

/**
 * Payload for the `instruction_response` event (Server -> Client)
 *
 * @see API_SPECIFICATION.md Section 3.2
 */
export interface InstructionResponsePayload {
  success: boolean;
  message: string;
}

// =============================================================================
// Utility Types
// =============================================================================

/**
 * Connection status for WebSocket
 */
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

/**
 * Dashboard store state shape
 *
 * @see STATE_MANAGEMENT.md Section 3
 */
export interface DashboardState {
  projectStatus: ProjectStatus | null;
  connectionStatus: ConnectionStatus;
  logs: ActivityLogEntry[];
}
