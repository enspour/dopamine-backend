import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import constants from "@constants";

const { LOCAL } = constants.strategies;

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOCAL) {}
