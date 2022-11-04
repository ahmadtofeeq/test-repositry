import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './AuthService';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validateToken(accessToken: string): Promise<any> {
    const verifiedToken = await this.authService.validateAuthToken(accessToken);
    if (!verifiedToken.user) {
      throw new UnauthorizedException();
    }
    return verifiedToken;
  }

  async validate(username: string, password: string): Promise<any> {
    return { username, password, sub: 'ddhhdhdhddd' };
  }
}