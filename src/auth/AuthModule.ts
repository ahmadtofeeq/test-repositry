import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from 'src/http/HttpModule';
import { AuthService } from './AuthService';
import { jwtConstants } from './constants';
import { JwtStrategy } from './JwtStrategy';
import { LocalStrategy } from './LocalStrategy';

@Module({
  imports:[HttpModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '360s' },
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
