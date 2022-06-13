import { Body, Controller, Get, Post } from '@nestjs/common';
import { Role } from 'src/guard/Role';
import { Roles } from 'src/guard/RolesDecorator';
import { AzureIdentity } from 'src/models/communication/AzureIdentity';
import { CommunicationService } from './CommunicationService';

@Controller('communication')
export class CommunicationController {


    constructor(private communnicationService: CommunicationService) {
    }

    @Roles(Role.Patient)
    @Post('/token')
    async generateAzureAccessToken(@Body() azureIdentity: AzureIdentity) {
        return this.communnicationService.generateAccessToken(azureIdentity)
    }
    
    @Roles(Role.Patient, Role.Reps)
    @Post('/refresh-token')
    async refreshAzureAccessToken(@Body() azureIdentity: AzureIdentity) {
        return this.communnicationService.generateAccessToken(azureIdentity)
    }

    @Roles(Role.Patient, Role.Reps)
    @Get('/azure-identity')
    async createAzureIdentity() {
        return this.communnicationService.createAzureIdentity()
    }

}
