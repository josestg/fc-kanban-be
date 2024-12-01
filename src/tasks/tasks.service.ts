import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  create(userId: number, dto: CreateTaskDto): Promise<Task> {
    const task = new Task(0, dto.title, dto.description);
    task.ownerId = userId;
    return this.taskRepository.save(task);
  }

  findAll(userId: number): Promise<Task[]> {
    return this.taskRepository.findBy({ isDeleted: false, ownerId: userId });
  }

  findOne(userId: number, id: number): Promise<Task | null> {
    // return this.taskRepository.findOneByOrFail({ Id: id, isDeleted: false });
    return this.taskRepository.findOneBy({ Id: id, isDeleted: false, ownerId: userId });
  }

  async update(userId: number, id: number, dto: UpdateTaskDto): Promise<Task | null> {
    return await this.findOne(userId, id)
      .then((task: Task | null) => {
        if (task) {
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
      })
      .then((task) => task ?  this.taskRepository.save(task) : null);
  }

  async remove(userId: number, id: number): Promise<Task | null> {
    return this.findOne(userId, id)
      .then((task: Task | null) => {
        if (task) {
          task.isDeleted = true;
          task.updatedAt = Date.now();
        }
        return task;
      })
      .then((task) => task ?  this.taskRepository.save(task) : null);
  }
}
