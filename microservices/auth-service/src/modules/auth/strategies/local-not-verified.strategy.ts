import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Strategy } from "passport-local";

import { AuthService } from "@auth/auth.service";
import { UsersService } from "@users/users.service";

import { LoginDto } from "@auth/dto/login.dto";

import constants from "@constants";

const { LOCAL_NOT_VERIFIED } = constants.strategies;

@Injectable()
export class LocalNotVerifiedStrategy extends PassportStrategy(
    Strategy,
    LOCAL_NOT_VERIFIED,
) {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {
        super({ usernameField: "email" });
    }

    async validate(email: string, password: string): Promise<any> {
        const object = plainToInstance(LoginDto, { email, password });

        const errors = await validate(object);

        if (errors.length > 0) {
            throw new BadRequestException("Incorrect credentials");
        }

        const user = await this.usersService.findOneByEmailAll(email);

        if (!user) {
            throw new BadRequestException("Incorrect credentials");
        }

        if (user.emails.some((item) => item.confirm)) {
            throw new BadRequestException("Email is already verified");
        }

        const isValid = await this.authService.validatePassword(
            user.password.hashed_password,
            password,
        );

        if (isValid) {
            const { password, ...result } = user;

            return result;
        }

        throw new BadRequestException("Incorrect credentials");
    }
}
