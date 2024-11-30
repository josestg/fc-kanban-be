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
}
