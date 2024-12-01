import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from "./entities/task.entity";
import { NotFoundException } from "@nestjs/common";

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  })

  it('find all should returns empty tasks', async () => {
    jest.spyOn(service, 'findAll')
      .mockImplementation(() => [] as Task[]);

    const tasks = await controller.findAll();
    expect(tasks).toHaveLength(0);
  })

  it('find all should returns all tasks', async () => {
    const tasks: Task[] = [
      new Task(1, 'task one', 'this is task one'),
      new Task(2, 'task two', 'this is task two'),
    ]

    jest.spyOn(service, 'findAll')
      .mockImplementation(() => tasks);

    const actual = await controller.findAll();
    expect(actual).toBe(tasks)
  })

  it('find one should be returns task', () => {
    const task: Task = new Task(42, 'task one', 'this is task one');
    jest.spyOn(service, 'findOne')
      .mockImplementation((id: number): Task | undefined => {
        expect(id).toBe(task.Id);
        return task
      });

    const actual = controller.findOne(42);
    expect(actual).toBe(task)
  })

  it('find one should be thrown not found exception', () => {
    jest.spyOn(service, 'findOne')
      .mockImplementation((id: number): Task | undefined => {
        expect(id).toBe(42);
        return undefined;
      });

    expect(() => controller.findOne(42)).toThrow(NotFoundException)
  })
});
