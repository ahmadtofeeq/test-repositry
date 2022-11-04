import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './HealthController';
import { HealthService } from './HealthService';
import { AllExceptionsFilter } from './exceptions/AllExceptionsFilter';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { JwtAuthGuard } from './guard/JwtAuthGuard';
import { AuthModule } from './auth/AuthModule';
import { HttpModule } from './http/HttpModule';
import { LocalStrategy } from './auth/LocalStrategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AppService } from './AppService';
import { ConsentModule } from './consent/ConsentModule';
import { KafkaModule } from './kafka/kafka.module';


@Module({
  imports: [AuthModule, ConfigModule.forRoot(
    {
      load: [configuration],
      isGlobal: true,
      cache: true
    }
  ), ConsentModule, KafkaModule, HttpModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '300s' },
  })],
  controllers: [AppController],
  providers: [AppService, LocalStrategy, HealthService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }],
})
export class AppModule { }
