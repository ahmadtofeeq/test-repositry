import { ConnectorConfig } from "./ConnectorConfig";


export interface KafkaLifeCycle {
    shutDown();
    start(connectorConfig: ConnectorConfig);
}