import { ConsumerRunConfig, ConsumerSubscribeTopic } from "kafkajs";
import { ConnectorConfig } from "./ConnectorConfig";
import { LifeCycle } from "./LifeCycle";


export interface ConsumerLifeCycle extends LifeCycle {
    consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) ;
}