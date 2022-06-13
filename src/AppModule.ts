import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './HealthController';
import { HealthService } from './HealthService';
import { AllExceptionsFilter } from './exceptions/AllExceptionsFilter';
import { CommunicationModule } from './communication/CommunicationModule';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthGuard } from './guard/AuthGuard';
import { AuthModule } from './auth/AuthModule';
import { HttpModule } from './http/HttpModule';


@Module({
  imports: [AuthModule, CommunicationModule, ConfigModule.forRoot(
    {
      load: [configuration],
      isGlobal: true
    }
  ), HttpModule],
  controllers: [AppController],
  providers: [HealthService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }],
})
export class AppModule { }
