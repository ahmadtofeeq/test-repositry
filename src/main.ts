import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { AllExceptionsFilter } from './exceptions/AllExceptionsFilter';
import { AuthGuard } from './guard/AuthGuard';

interface EnvironmentConfig {
  port: number;
  host: string;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalGuards(new AuthGuard());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  const configService = app.get(ConfigService)
  const envConfig = configService.get<EnvironmentConfig>('envConfig')
  await app.listen(envConfig.port);
}
bootstrap();
