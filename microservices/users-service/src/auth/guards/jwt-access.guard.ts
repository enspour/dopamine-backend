import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import constants from "@constants";

const { JWT_ACCESS } = constants.strategies;

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard(JWT_ACCESS) {}
