import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {

  getHealthStatus(): object {
    return { message : 'Server is running..' };
  }
}
