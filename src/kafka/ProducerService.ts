
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { ConnectorConfig } from './interfaces/ConnectorConfig';
import { KafkaLifeCycle } from './interfaces/KafkaLifeCycle';

export class ProducerService implements KafkaLifeCycle {

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