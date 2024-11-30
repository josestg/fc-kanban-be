import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Version('1')
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const task = this.tasksService.findOne(id);
    if (task === undefined) {
      throw new NotFoundException('task not found');
    }
    return task;
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto) {
    const task = this.tasksService.update(id, dto);
    if (task === undefined) {
      throw new NotFoundException('task not found');
    }
    return task;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    const task = this.tasksService.remove(+id);
    if (task === undefined) {
      throw new NotFoundException('task not found');
    }
    return task;
  }
}
