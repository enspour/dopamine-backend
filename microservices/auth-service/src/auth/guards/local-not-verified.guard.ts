import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import constants from "@constants";

const { LOCAL_NOT_VERIFIED } = constants.strategies;

@Injectable()
export class LocalNotVerifiedAuthGuard extends AuthGuard(LOCAL_NOT_VERIFIED) {}
