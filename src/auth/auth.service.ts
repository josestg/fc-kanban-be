import { Injectable } from '@nestjs/common';
import { User } from "../users/entities/user.entity";
import { TokenDto } from "./dto/token.dto";
import { JwtService } from "@nestjs/jwt";
import {randomUUID} from "node:crypto"

@Injectable()
export class AuthService {


  constructor(
    private readonly jwtService: JwtService
  ) {
  }

  async genToken(usr: User): Promise<TokenDto> {
    const payload = {
      jwtid: randomUUID(),
      sub: usr.id,
      email: usr.email
    }

    return {
      kind: 'Bearer',
      token: await this.jwtService.signAsync(payload)
    }
  }
}
