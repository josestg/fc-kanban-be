import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { CoreModule } from './core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import config, { DatabaseConfig, JWTConfig } from "./config/config";
import { JwtModule } from "@nestjs/jwt";
import { AUTH_SECRET } from "./auth/constant/constant";

@Module({
  imports: [
    TasksModule,
    CoreModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      envFilePath: [
        ".env"
      ]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => {
        const conf = cs.get<DatabaseConfig>('database')
        return {
          type: 'postgres',
          entities: [Task, User],
          ...conf,
        }
      }
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => {
        const conf = cs.get<JWTConfig>('jwt')
        return {
          secret: conf.secret,
          signOptions: {
            algorithm: conf.algorithm,
            expiresIn: conf.expires,
            audience: conf.audience,
            issuer: conf.issuer,
          },
        }
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
