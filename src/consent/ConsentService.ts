import { Injectable } from '@nestjs/common';
import { KafkaConstants } from 'src/kafka/KafkaConstants';
import { ProducerService } from 'src/kafka/ProducerService';

@Injectable()
export class ConsentService {

    constructor(private readonly producerService: ProducerService) { }

    public async getAppConsent(): Promise<object> {
        return [{ name: 'T&C' }, { name: 'Privact' }];
    }


    public async createConsents(): Promise<object> {
        // TODO simulate DB insertion
        await this.producerService.produce({
            topic: KafkaConstants.topicGlobalService, messages: [
                {
                    key: 'CreateConsent',
                    value: 'Hi, New consent Has been created!!'
                }
            ]
        })

        return {
            key: 'CreateConsent',
            value: 'Hi, New consent Has been created!!'
        }
    }
}
