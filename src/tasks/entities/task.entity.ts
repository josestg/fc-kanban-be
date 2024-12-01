import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export const TASK_STATUSES = [
  'TODO',
  'ON_PROGRESS',
  'DONE',
  'ARCHIVED',
  'INVALID',
] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

@Entity()
export class Task {
  @PrimaryGeneratedColumn({name: 'id'})
  Id: number;

  @Column({type: 'varchar', length: 20, nullable: false})
  title: string;

  @Column({type: 'varchar', length: 255, nullable: false})
  description: string;

  @Column({type: 'enum', enum: TASK_STATUSES, default: 'TODO'})
  status: TaskStatus;

  @Column({type: 'bigint', nullable: false})
  ownerId: number;

  @Column({type: 'bigint', nullable: false})
  createdAt: number; // unix timestamp in millisecond.

  @Column({type: 'bigint', nullable: false})
  updatedAt: number; // unix timestamp in millisecond.

  @Column({type: 'boolean', default: false})
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
