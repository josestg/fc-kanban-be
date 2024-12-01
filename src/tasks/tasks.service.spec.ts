import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from "./dto/create-task.dto";

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should added new task', () => {
    const dto: CreateTaskDto = {
      title: 'task two',
      description: 'this is task two'
    }

    const task = service.create(dto);
    expect(task.Id).toBe(4);
    expect(task.title).toBe(dto.title);
    expect(task.description).toBe(dto.description);
    expect(task.isDeleted).toBe(false);
    expect(service.findAll()).toHaveLength(2);
  })

  it('create 2 tasks should added 2 tasks', () => {
    const dto: CreateTaskDto = {
      title: 'task two',
      description: 'this is task two'
    }

    let task = service.create(dto);
    expect(task.Id).toBe(4);

    task = service.create(dto);
    expect(task.Id).toBe(5);


    expect(service.findAll()).toHaveLength(3);
  })
});
