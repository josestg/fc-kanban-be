import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        { provide: getRepositoryToken(Task), useClass: Repository<Task> },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find all should returns empty tasks',  () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve([] as Task[]));

    const tasks = controller.findAll();
    expect(tasks).resolves.toHaveLength(0);
  });

  it('find all should returns all tasks', async () => {
    const tasks: Task[] = [
      new Task(1, 'task one', 'this is task one'),
      new Task(2, 'task two', 'this is task two'),
    ];

    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(tasks));

    const actual = await controller.findAll();
    expect(actual).toBe(tasks);
  });

  it('find one should be returns task', () => {
    const task: Task = new Task(42, 'task one', 'this is task one');
    jest
      .spyOn(service, 'findOne')
      .mockImplementation((id: number): Promise<Task | null> => {
        expect(id).toBe(task.Id);
        return Promise.resolve(task);
      });

    const actual = controller.findOne(42);
    expect(actual).resolves.toBe(task);
  });

  it('find one should be thrown not found exception', () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation((id: number): Promise<Task | null> => {
        expect(id).toBe(42);
        return Promise.resolve(null);
      });

    expect(controller.findOne(42)).rejects.toThrow(NotFoundException);
  });
});
