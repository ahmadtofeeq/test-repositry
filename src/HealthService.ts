import { Injectable } from '@nestjs/common';
import { KafkaConstants } from './kafka/KafkaConstants';
import { ProducerService } from './kafka/ProducerService';

@Injectable()
export class HealthService {

  constructor(private readonly producerService: ProducerService) { }

  async getHealthStatus(): Promise<object> {
    await this.producerService.produce({
      topic: KafkaConstants.topicGlobalService,
      messages: [
        {
          value: 'Hello!! Consent related changes happens'
        }
      ]
    })
    return { message: 'Server is running..' };
  }
}
