import { Injectable, OnModuleInit , OnApplicationShutdown} from '@nestjs/common';
import { Kafka, Consumer, ConsumerSubscribeTopic, ConsumerRunConfig } from 'kafkajs';
import { KafkaConstants } from './KafkaConstants';

@Injectable()
export class ConsumerService implements OnApplicationShutdown{
    
    async onApplicationShutdown(signal?: string) {
        for (const consumer of this.consumers){
            await consumer.disconnect();
        }
    }

    private readonly kafka = new Kafka({
        brokers: ['localhost:29092']
    });
    private readonly consumers: Consumer []=[];
    

    async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig){
        const consumer = this.kafka.consumer({groupId:KafkaConstants.topicGlobalService})
        await consumer.connect();
        await consumer.subscribe(topic)
        await consumer.run(config);
        this.consumers.push(consumer);
    }
}