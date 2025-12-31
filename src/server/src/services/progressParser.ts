import fs from 'fs';
import path from 'path';

export interface TrackStatus {
  track: string;
  owner: string;
  currentTask: string;
  branch: string;
  status: string;
}

export interface TaskStatus {
  task: string;
  track: string;
  description: string;
  status: string;
  dependencies: string;
}

export interface ProjectStatus {
  lastUpdated: string;
  tracks: TrackStatus[];
  tasks: TaskStatus[];
  overallStatus: 'On Track' | 'In Progress' | 'Blocked' | 'Unknown';
  completedTasks: number;
  totalTasks: number;
}

export class ProgressParser {
  private progressFilePath: string;

  constructor(watchDir: string) {
    this.progressFilePath = path.join(watchDir, 'progress.md');
  }

  /**
   * Parse progress.md and extract project status
   */
  public parseProgress(): ProjectStatus {
    try {
      const content = fs.readFileSync(this.progressFilePath, 'utf-8');

      return {
        lastUpdated: this.extractLastUpdated(content),
        tracks: this.extractTracks(content),
        tasks: this.extractTasks(content),
        overallStatus: this.determineOverallStatus(content),
        completedTasks: this.countCompletedTasks(content),
        totalTasks: this.countTotalTasks(content),
      };
    } catch (error) {
      console.error('Error parsing progress.md:', error);
      return this.getDefaultStatus();
    }
  }

  /**
   * Extract "Last Updated" date from progress.md
   */
  private extractLastUpdated(content: string): string {
    const match = content.match(/\*\*Last Updated\*\*:\s*(.+)/);
    return match ? match[1].trim() : new Date().toISOString();
  }

  /**
   * Extract track status from "Current Status" table
   */
  private extractTracks(content: string): TrackStatus[] {
    const tracks: TrackStatus[] = [];
    const tableRegex = /\|\s*\*\*([^*]+)\*\*\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*`([^`]+)`\s*\|\s*([^|]+)\|/g;

    let match;
    while ((match = tableRegex.exec(content)) !== null) {
      tracks.push({
        track: match[1].trim(),
        owner: match[2].trim(),
        currentTask: match[3].trim(),
        branch: match[4].trim(),
        status: match[5].trim(),
      });
    }

    return tracks;
  }

  /**
   * Extract task overview from "Task Overview" table
   */
  private extractTasks(content: string): TaskStatus[] {
    const tasks: TaskStatus[] = [];
    const taskRegex = /\|\s*(TASK-\d+)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/g;

    let match;
    while ((match = taskRegex.exec(content)) !== null) {
      tasks.push({
        task: match[1].trim(),
        track: match[2].trim(),
        description: match[3].trim(),
        status: match[4].trim(),
        dependencies: match[5].trim(),
      });
    }

    return tasks;
  }

  /**
   * Determine overall project status based on tasks
   */
  private determineOverallStatus(content: string): 'On Track' | 'In Progress' | 'Blocked' | 'Unknown' {
    if (content.includes('⏳ Blocked') || content.includes('🔴')) {
      return 'Blocked';
    }
    if (content.includes('🟡 In Progress') || content.includes('⚪ Ready')) {
      return 'In Progress';
    }
    if (content.includes('✅ Done') || content.includes('🟢')) {
      return 'On Track';
    }
    return 'Unknown';
  }

  /**
   * Count completed tasks
   */
  private countCompletedTasks(content: string): number {
    const completedMatches = content.match(/✅ Done/g);
    return completedMatches ? completedMatches.length : 0;
  }

  /**
   * Count total tasks
   */
  private countTotalTasks(content: string): number {
    const taskMatches = content.match(/TASK-\d+/g);
    if (!taskMatches) return 0;

    // Use Set to count unique tasks
    const uniqueTasks = new Set(taskMatches);
    return uniqueTasks.size;
  }

  /**
   * Return default status when parsing fails
   */
  private getDefaultStatus(): ProjectStatus {
    return {
      lastUpdated: new Date().toISOString(),
      tracks: [],
      tasks: [],
      overallStatus: 'Unknown',
      completedTasks: 0,
      totalTasks: 0,
    };
  }
}
