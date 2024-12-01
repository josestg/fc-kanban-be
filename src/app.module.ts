import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { CoreModule } from './core/core.module';
import {  TypeOrmModule } from  '@nestjs/typeorm'
import { Task } from "./tasks/entities/task.entity";
import { UsersModule } from './users/users.module';
import { User } from "./users/entities/user.entity";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    CoreModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'kanban-be',
      password: 'kanban-be',
      database: 'kanban-be',
      entities: [
        Task,
        User,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
