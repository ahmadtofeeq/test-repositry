import { injectable } from 'inversify';
import { Kafka, Consumer, ConsumerSubscribeTopic, ConsumerRunConfig } from 'kafkajs';
import { ConnectorConfig } from './interfaces/ConnectorConfig';
import { ConsumerLifeCycle } from './interfaces/ConsumerLifeCycle';
import { KafkaManager } from './KafkaManager';

@injectable()
export class ConsumerService implements ConsumerLifeCycle {
    
    constructor() {

    }

    async shutDown() {
        for (const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }

    async start(connectorConfig: ConnectorConfig) {
        this.kafka = new Kafka({
            brokers: [`${connectorConfig.host}:${connectorConfig.port}`]
        });
    }

    private kafka: Kafka;
    private readonly consumers: Consumer[] = [];


    async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
        const consumer = this.kafka.consumer({ groupId: topic.topic as string })
        await consumer.connect();
        await consumer.subscribe(topic)
        await consumer.run(config);
        this.consumers.push(consumer);
    }
}