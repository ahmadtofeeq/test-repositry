import { HealthService } from './HealthService';
import { Controller, Body, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/AuthService';
// import { JwtAuthGuard } from './auth/JwtAuthGuard';

@Controller()
export class AppController {
  constructor(private readonly healthService: HealthService, private readonly authService: AuthService) { }

  @Get('/health')
  health(): object {
    return this.healthService.getHealthStatus();
  }

  @Post('/login')
  async login(@Request() req, @Body() user: any) {
    return this.authService.login(user);
  }

}
