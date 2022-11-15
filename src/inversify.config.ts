import { Container } from "inversify";
import { ConsumerService } from "./kafka/ConsumerService";
import { ConsumerLifeCycle } from "./kafka/interfaces/ConsumerLifeCycle";
import { ProducerLifeCycle } from "./kafka/interfaces/ProducerLifeCycle";
import { TYPES } from "./kafka/interfaces/Types";
import { ProducerService } from "./kafka/ProducerService";


const myContainer = new Container();
myContainer.bind<ProducerLifeCycle>(TYPES.ProducerLifeCycle).to(ProducerService);
myContainer.bind<ConsumerLifeCycle>(TYPES.ConsumerLifeCycle).to(ConsumerService);


export { myContainer };