import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpCode, HttpException
} from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserLoggedDto } from './dto/user-logged.dto';
import { QueryFailedError } from "typeorm";
import { rethrow } from "@nestjs/core/helpers/rethrow";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (ex) {
      if (ex instanceof QueryFailedError) {
        const {code} = ex.driverError
        switch (code) {
          case "23505":
            throw new HttpException('email already taken', HttpStatus.CONFLICT)
          default:
            console.log('unhandled error code',ex.driverError.code)
        }
      }
      rethrow(ex)
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto): Promise<UserLoggedDto> {
    return this.usersService.login(dto);
  }

  @Get('profile')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }
}
