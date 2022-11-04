import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './ConsumerService';
import { KafkaConstants } from './KafkaConstants';

@Injectable()
export class KafkaConsumer implements OnModuleInit {

    constructor(private readonly consumerService: ConsumerService) { }
    async onModuleInit() {
        await this.consumerService.consume(
            { topic : KafkaConstants.topicUserService }, {
            eachMessage: async ({ topic, partition, message }) => {
                    console.log({
                        topic: topic.toString(),
                        partition: partition.toString(),
                        value: message.value.toString()
                    })
            }
        });
    }

}