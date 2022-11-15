import { ProducerRecord } from "kafkajs";
import { ConnectorConfig } from "./ConnectorConfig";
import { LifeCycle } from "./LifeCycle";


export interface ProducerLifeCycle extends LifeCycle {
    produce(record: ProducerRecord);
}