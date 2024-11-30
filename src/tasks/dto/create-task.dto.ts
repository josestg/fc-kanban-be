import { IsNotEmpty, Length, IsAscii } from 'class-validator';

export class CreateTaskDto {
  @IsAscii()
  @Length(3, 20)
  @IsNotEmpty({ message: 'title is required' })
  readonly title: string;

  @Length(3, 100)
  @IsNotEmpty()
  readonly description: string;
}
