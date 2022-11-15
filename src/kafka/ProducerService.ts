
import { injectable } from 'inversify';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { ConnectorConfig } from './interfaces/ConnectorConfig';
import { ProducerLifeCycle } from './interfaces/ProducerLifeCycle';

@injectable()
export class ProducerService implements ProducerLifeCycle {

    constructor() {

    }
    async shutDown() {
        await this.producer.disconnect()
    }
    async start(connectorConfig: ConnectorConfig) {
        this.kafka = new Kafka({
            brokers: [`${connectorConfig.host}:${connectorConfig.port}`]
        });
        this.producer = this.kafka.producer();
        await this.producer.connect()
    }

    private kafka: Kafka;

    private producer: Producer;

    async produce(record: ProducerRecord) {
        await this.producer.send(record)
    }
}