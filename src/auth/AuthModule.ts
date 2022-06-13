import { Module } from '@nestjs/common';
import { HttpModule } from 'src/http/HttpModule';
import { AuthService } from './AuthService';

@Module({
  imports:[HttpModule],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
