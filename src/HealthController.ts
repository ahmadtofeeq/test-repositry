import { Controller, Get } from '@nestjs/common';
import { HealthService } from './HealthService';
import { Role } from './guard/Role';
import { Roles } from './guard/RolesDecorator';

@Controller()
export class AppController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/health')
  health(): object {
    return this.healthService.getHealthStatus();
  }

}
