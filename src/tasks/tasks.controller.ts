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
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthRequest } from '../core/request/auth';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  create(@Req() req: AuthRequest, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(req.authenticatedUser.id, dto);
  }

  @Version('1')
  @Get()
  async findAll(@Req() req: AuthRequest) {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return this.tasksService.findAll(req.authenticatedUser.id);
  }

  @Get(':id')
  async findOne(@Req() req: AuthRequest, @Param('id') id: number) {
    const task = await this.tasksService.findOne(req.authenticatedUser.id, id);
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return task;
  }

  @Patch(':id')
  async update(@Req() req: AuthRequest, @Param('id') id: number, @Body() dto: UpdateTaskDto) {
    const task = await this.tasksService.update(req.authenticatedUser.id, id, dto);
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return task;
  }

  @Delete(':id')
  async remove(@Req() req: AuthRequest, @Param('id') id: number) {
    const task = await this.tasksService.remove(req.authenticatedUser.id, id);
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return task;
  }
}
