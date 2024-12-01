import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<CreateUserDto> {
    const salt = bcrypt.genSaltSync(10);
    const timestamp = Date.now();
    const usr = this.userRepository.create();
    usr.name = dto.name;
    usr.email = dto.email;
    usr.passwordHash = bcrypt.hashSync(dto.password, salt)
    usr.isDeleted = false;
    usr.createdAt = timestamp;
    usr.updatedAt = timestamp;
    return this.userRepository.save(usr).then(usr => {
      return new CreateUserDto(usr.name, usr.email);
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
