import { Controller, Get, Request, Post } from '@nestjs/common';
import { Role } from 'src/guard/Role';
import { Roles } from 'src/guard/RolesDecorator';
import { ConsentService } from './ConsentService';

@Controller('consent')
export class ConsentController {

  constructor(private consentService: ConsentService) { }

  @Roles(Role.Patient, Role.AppAdmin, Role.PlatformAdmin)
  @Get('/')
  async login(@Request() req) {
    return this.consentService.getAppConsent();
  }

  @Roles(Role.PlatformAdmin)
  @Post('/')
  async createConsent(@Request() req) {
    return this.consentService.createConsents();
  }
}
