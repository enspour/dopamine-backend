import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

import { UsersService } from "@users/users.service";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validatePassword(hashedPassword: string, password: string) {
        return await bcrypt.compare(password, hashedPassword);
    }

    async createUser(nickname: string, email: string, password: string) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return await this.usersService.createOne(
            nickname,
            email,
            hashedPassword,
        );
    }
}
