import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { User } from 'src/models/auth/User';
import { UserInfo } from 'src/models/user/UserInfo';

interface NovaAuthConfig {
    host: string;
    meApi: string;
    updateUserInfo: string;
}

@Injectable()
export class HttpService {

    axiosInstance: AxiosInstance;
    azureConfig: NovaAuthConfig;

    constructor(private configService: ConfigService) {
        this.azureConfig = this.configService.get<NovaAuthConfig>('novaAuth')
        this.axiosInstance = axios.create({
            baseURL: this.azureConfig.host
        });
    }

    async getMe(bearer: string): Promise<User> {
        try {
            const response = await this.axiosInstance.get(this.azureConfig.meApi,
                { headers: { "Authorization": `${bearer}` } })
            const user: User = response.data
            return user;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('handleAxiosError(error)' + error);
            } else {
                console.log('handleUnexpectedError(error)' + error);
            }
        }
    }


    async updateUserInfo(bearer: string, userInfo: UserInfo, userId: string): Promise<UserInfo> {
        try {
            const response = await this.axiosInstance.post(this.azureConfig.updateUserInfo.replace('{user_id}', userId), // TODO find a better way
                { headers: { "Authorization": `${bearer}` }, data: userInfo })
            const resUserInfo: UserInfo = response.data
            return resUserInfo;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('handleAxiosError(error)' + error);
            } else {
                console.log('handleUnexpectedError(error)' + error);
            }
        }
    }

}
