/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class RevokedJwtGuard extends AuthGuard('jwt') {
  constructor(private userService: UserService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const token = authHeader.split(' ')[1];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const isRevoked = await this.userService.isTokenRevoked(token);
    if (isRevoked) return false;

    const canActivate = await super.canActivate(context);
    return canActivate as boolean;
  }
}
