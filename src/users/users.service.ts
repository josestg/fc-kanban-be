import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { UserCreatedDto } from "./dto/user-created.dto";
import { LoginDto } from "./dto/login.dto";
import { UserLoggedDto } from "./dto/user-logged.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserCreatedDto> {
    const salt = bcrypt.genSaltSync(10);
    const timestamp = Date.now();
    const usr = this.userRepository.create();
    usr.name = dto.name;
    usr.email = dto.email;
    usr.passwordHash = bcrypt.hashSync(dto.password, salt)
    usr.isDeleted = false;
    usr.createdAt = timestamp;
    usr.updatedAt = timestamp;
    return this.userRepository.save(usr).then((usr): UserCreatedDto => {
      return {
        name: usr.name,
        email: usr.email
      }
    });
  }

  async login(dto: LoginDto): Promise<UserLoggedDto> {
    const usr = await this.userRepository.findOneBy({email: dto.email, isDeleted: false})
    if(!usr) {
      return null;
    }

    console.log(usr)
    const matched = bcrypt.compareSync(dto.password, usr.passwordHash);
    if (!matched) {
      return null;
    }

    return {
      id: usr.id,
      name: usr.name,
      email: usr.email
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
