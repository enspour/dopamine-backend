import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import constants from "@constants";

const { JWT_REFRESH } = constants.strategies;

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard(JWT_REFRESH) {}
