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

  create(dto: CreateTaskDto): Promise<Task> {
    const task = new Task(0, dto.title, dto.description);
    return this.taskRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.findBy({ isDeleted: false });
  }

  findOne(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ Id: id, isDeleted: false });
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    return await this.findOne(id)
      .then((task) => {
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
        return task;
      })
      .then((task) => this.taskRepository.save(task));
  }

  async remove(id: number): Promise<Task> {
    return this.findOne(id)
      .then((task) => {
        task.isDeleted = true;
        task.updatedAt = Date.now();
        return task;
      })
      .then(this.taskRepository.save.bind(this.taskRepository));
  }
}
