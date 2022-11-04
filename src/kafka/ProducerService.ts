
import { Injectable, OnModuleInit , OnApplicationShutdown} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
    
    async onApplicationShutdown(signal?: string) {
        await this.producer.disconnect()
    }

    private readonly kafka = new Kafka({
        brokers: ['localhost:29092']
    });
    private readonly producer: Producer = this.kafka.producer();
    
    async onModuleInit() {
        await this.producer.connect()    
    }

    async produce(record: ProducerRecord){
        await this.producer.send(record)
    }


}