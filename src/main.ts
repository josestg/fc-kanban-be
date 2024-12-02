import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "./config/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI, // /v<?>
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );


  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app')
  await app.listen(appConfig.port);

  Logger.log(`service started on port ${appConfig.port}.`)
}
bootstrap();
