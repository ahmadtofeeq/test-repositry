import { ConsumerService } from "./ConsumerService";
import { inject } from 'inversify';
import { TYPES } from "./interfaces/Types";
import { ProducerService } from "./ProducerService";
import { ConnectorConfig } from "./interfaces/ConnectorConfig";
import { myContainer } from "../inversify.config";
import { ConsumerRunConfig, ConsumerSubscribeTopic } from "kafkajs";

export class KafkaManager {

    constructor() {
        myContainer.get<ConsumerService>(TYPES.ConsumerLifeCycle);
        myContainer.get<ProducerService>(TYPES.ProducerLifeCycle);
    }

    @inject(TYPES.ConsumerLifeCycle) readonly consumerService: ConsumerService;
    @inject(TYPES.ProducerLifeCycle) readonly producerService: ProducerService;

    async initilize(connectorConfig: ConnectorConfig) {
        await this.consumerService.start(connectorConfig);
        await this.producerService.start(connectorConfig);
    }

    async release() {
        await this.consumerService.shutDown();
        await this.producerService.shutDown();
    }

    async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
        this.consumerService.consume(topic, config)
    }
}