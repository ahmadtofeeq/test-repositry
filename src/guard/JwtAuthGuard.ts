import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/AuthService";
import { Authority } from "src/models/auth/Authority";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  @Inject()
  private authService: AuthService;
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers['authorization'];

    if (!accessToken) {
      throw new UnauthorizedException()
    }
    const verifiedToken = await this.authService.validateAuthToken(accessToken);
    return this.matchRoles(roles, verifiedToken.role, accessToken);
  }

  async matchRoles(roles: string[], role: string, verifiedToken: any): Promise<boolean> {
    if (roles.includes(role)) {
      return verifiedToken;
    }

    return false;
  }

}