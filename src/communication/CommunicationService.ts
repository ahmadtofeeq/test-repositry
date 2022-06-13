import { CommunicationIdentityClient } from '@azure/communication-identity';
import { Injectable } from '@nestjs/common';
import { AzureIdentity } from 'src/models/communication/AzureIdentity';
import { AzureToken } from 'src/models/communication/AzureToken';
import { AzureManager } from './AzureManager';

@Injectable()
export class CommunicationService {

    constructor(private azureManager: AzureManager) {

    }
    async generateAccessToken(azureIdentity: AzureIdentity): Promise<AzureToken> {
        const azureToken = await this.azureManager.generateRefreshToken(azureIdentity)
        return azureToken;
    }

    async refreshAccessToken(azureIdentity: AzureIdentity): Promise<AzureToken> {
        const azureToken = await this.azureManager.generateRefreshToken(azureIdentity)
        return azureToken;
    }

    async createAzureIdentity(): Promise<AzureIdentity> {
        const azureIdentity = await this.azureManager.createAzureIdentity() // TODO to fetch from database
        return azureIdentity;
    }
}
