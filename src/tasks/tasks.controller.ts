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
  NotFoundException,
  UseGuards
} from "@nestjs/common";
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Version('1')
  @Get()
  async findAll() {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const task = await this.tasksService.findOne(id);
    console.log(task)
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return task;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    const task = await this.tasksService.update(id, dto);
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return task;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const task = await this.tasksService.remove(+id);
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return task;
  }
}
