import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/AuthService";
import { Authority } from "src/models/auth/Authority";
import { User } from "src/models/auth/User";


@Injectable()
export class AuthGuard implements CanActivate {

  @Inject()
  private authService: AuthService;
  constructor(private reflector: Reflector) { }

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
    const user = await this.authService.validateAuthToken(accessToken);
    const autherities = user.authorities;
    return this.matchRoles(roles, autherities);
  }

  async matchRoles(roels: string[], incomingRoles: Authority[]): Promise<boolean> {
    const isRolePresent = roels.some((role, index) => {
      const filterAuthority = incomingRoles.filter((authority) => {
        return authority.authority == role
      })
      return filterAuthority.length > 0 ? true : false;
    })

    return isRolePresent;
  }

}