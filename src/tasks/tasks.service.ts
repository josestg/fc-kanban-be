import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      Id: 3,
      title: 'Task 1',
      description: 'This is task 1',
      status: 'TODO',
      ownerId: -1,
      updatedAt: Date.now(),
      createdAt: Date.now(),
      isDeleted: false,
    },
  ];

  create(dto: CreateTaskDto) {
    const nextId = Math.max(...this.tasks.map((t) => t.Id)) + 1;
    const task = new Task(nextId, dto.title, dto.description);
    this.tasks.push(task);
    return task;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number): Task | undefined {
    return this.tasks.find((t) => t.Id === id && !t.isDeleted);
  }

  update(id: number, dto: UpdateTaskDto): Task | undefined {
    const task = this.findOne(id);
    console.log({ task, dto });
    if (task !== undefined) {
      if (dto.status) {
        task.status = dto.status;
      }

      if (dto.title) {
        task.title = dto.title;
      }

      if (dto.description) {
        task.description = dto.description;
      }

      task.updatedAt = Date.now();
    }
    return task;
  }

  remove(id: number): Task | undefined {
    const task = this.findOne(id);
    if (task !== undefined) {
      task.isDeleted = true;
      task.updatedAt = Date.now();
    }
    return task;
  }
}
