import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  const dto: CreateTaskDto = {
    title: 'task two',
    description: 'this is task two',
  };

  const task = new Task(1, dto.title, dto.description);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getRepositoryToken(Task), useClass: Repository<Task> },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('create should added new task', () => {
    jest
      .spyOn(repository, 'save')
      .mockImplementation((_: Task) => Promise.resolve(task));

    expect(service.create(dto)).resolves.toBe(task);
  });

  it('find one by id', () => {
    jest
      .spyOn(repository, 'findOneBy')
      .mockImplementation(
        (filters: { Id: number; isDeleted: boolean }): Promise<Task> => {
          expect(filters.Id).toBe(task.Id);
          expect(filters.isDeleted).toBe(false);
          return Promise.resolve(task);
        },
      );

    expect(service.findOne(task.Id)).resolves.toBe(task);
  });
});
