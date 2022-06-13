import { CommunicationUserIdentifier } from "@azure/communication-common";
import { IsNotEmpty } from "class-validator";


export class AzureIdentity implements CommunicationUserIdentifier {
    @IsNotEmpty()
    communicationUserId: string;
}