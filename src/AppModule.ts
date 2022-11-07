import { Module } from '@nestjs/common';
import { AppService } from './AppService';
import { KafkaModule } from './kafka/kafka.module';


@Module({
  imports: [ KafkaModule],
  providers: [AppService],
  exports: [KafkaModule]
})
export class AppModule { }
