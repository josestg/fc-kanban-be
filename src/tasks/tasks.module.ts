import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { AuthService } from "../auth/auth.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task,
    ])
  ],
  controllers: [TasksController],
  providers: [TasksService, AuthService],
})
export class TasksModule {}
