import { ProducerRecord } from "kafkajs";
import { ConnectorConfig } from "./ConnectorConfig";


export interface LifeCycle {
    shutDown();
    start(connectorConfig: ConnectorConfig);
}