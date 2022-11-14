import {ProducerService} from './kafka/ProducerService';
import {KafkaTopics} from './kafka/KafkaTopics';
import {ConnectorConfig} from './kafka/interfaces/ConnectorConfig';
import { ConsumerRunConfig, ConsumerSubscribeTopic } from 'kafkajs';

export {ConsumerService, ProducerService, KafkaTopics, ConnectorConfig}

declare class ConsumerService {
    shutDown();
    start(connectorConfig: ConnectorConfig);
    consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig);
}

