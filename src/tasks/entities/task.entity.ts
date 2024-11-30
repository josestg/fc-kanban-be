export const TASK_STATUSES = [
  'TODO',
  'ON_PROGRESS',
  'DONE',
  'ARCHIVED',
  'INVALID',
] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export class Task {
  Id: number;
  title: string;
  description: string;
  status: TaskStatus;
  ownerId: number;
  createdAt: number; // unix timestamp in millisecond.
  updatedAt: number; // unix timestamp in millisecond.
  isDeleted: boolean;

  constructor(id: number, title: string, description: string) {
    const timestamp = Date.now();
    this.Id = id;
    this.title = title;
    this.description = description;
    this.status = 'TODO';
    this.ownerId = -1;
    this.isDeleted = false;
    this.updatedAt = timestamp;
    this.createdAt = timestamp;
  }
}
