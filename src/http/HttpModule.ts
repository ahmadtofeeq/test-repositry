import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/AuthModule';
import { HttpService } from './HttpService';

@Module({
  providers: [HttpService],
  exports: [HttpService]
})
export class HttpModule {}
