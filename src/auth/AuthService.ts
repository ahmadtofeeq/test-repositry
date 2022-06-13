import { Injectable } from '@nestjs/common';
import { HttpService } from 'src/http/HttpService';
import { User } from 'src/models/auth/User';

@Injectable()
export class AuthService {

    constructor(private httpService: HttpService) {

    }
    async validateAuthToken(accessToken: string): Promise<User> {
        const user = await this.httpService.getMe(accessToken);
        return user;
    }

    async validateUser(username: string, pass: string): Promise<any> {
        return null;
    }

}
