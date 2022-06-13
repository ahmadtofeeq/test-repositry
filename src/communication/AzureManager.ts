import { CommunicationIdentityClient, TokenScope, } from "@azure/communication-identity";
import { ConfigService } from "@nestjs/config";
import { AzureToken } from "src/models/communication/AzureToken";
import { AzureIdentity } from "src/models/communication/AzureIdentity";
import { Injectable } from "@nestjs/common";

interface AzureConfig {
    connectionstring: string;
    accesskey: string;
}


@Injectable()
export class AzureManager {

    private identityClient: CommunicationIdentityClient;

    constructor(private configService: ConfigService) {
        const azureCOnfig = this.configService.get<AzureConfig>('azure')
        this.identityClient = new CommunicationIdentityClient(azureCOnfig.connectionstring);
    }
    
    async generateRefreshToken(azureIdentity: AzureIdentity): Promise<AzureToken> {
        const scope: TokenScope[] = ['voip']
        const tokenReponse: AzureToken = await this.identityClient.getToken(azureIdentity, scope)
        return tokenReponse;
    }

    async createAzureIdentity(): Promise<AzureIdentity> {
        const idenityResponse: AzureIdentity = await this.identityClient.createUser()
        return idenityResponse;
    }
}