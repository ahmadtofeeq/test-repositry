import { Module } from '@nestjs/common';
import { CommunicationService } from './CommunicationService';
import { CommunicationController } from './CommunicationController';
import { ConfigModule } from '@nestjs/config';
import { AzureManager } from './AzureManager';

@Module({
  providers: [CommunicationService, AzureManager],
  controllers: [CommunicationController],
  imports: [ConfigModule]
})
export class CommunicationModule { }
