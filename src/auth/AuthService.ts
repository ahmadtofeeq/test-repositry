import { Injectable } from '@nestjs/common';
import { HttpService } from 'src/http/HttpService';
import { User } from 'src/models/auth/User';
import { JwtService } from '@nestjs/jwt';
import { VerifiedToken } from 'src/models/auth/VerifiedToken';

@Injectable()
export class AuthService {

  constructor(private httpService: HttpService,
    private jwtService: JwtService) { }

  async validateAuthToken(accessToken: string): Promise<VerifiedToken> {

    const verifiedToken: VerifiedToken = this.jwtService.verify(accessToken.split(' ')[1]);
    const user: User = await this.httpService.getMe(accessToken);
    verifiedToken.user = user;
    return verifiedToken;

  }

  async login(user: any) {
    const payload = { userId: user.userId, role: user.role, region: user.region, token: user.application_token };
    // TODO fetch users details
    const accessToken = this.jwtService.sign(payload)
    return {
      access_token: accessToken
    };
  }

}
