import { Module } from '@nestjs/common';
import { ConsumerService } from './ConsumerService';
import { KafkaConsumer } from './KafkaConsumer';
import { ProducerService } from './ProducerService';

@Module({
    providers: [ProducerService, ConsumerService, KafkaConsumer],
    exports: [ProducerService, ConsumerService]
})
export class KafkaModule {}
