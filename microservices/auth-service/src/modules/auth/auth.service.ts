import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

import { AuthQueueService } from "@auth-queue/auth-queue.service";
import { UsersService } from "@users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private authQueueService: AuthQueueService,
    ) {}

    async validatePassword(hashedPassword: string, password: string) {
        return await bcrypt.compare(password, hashedPassword);
    }

    async createUser(nickname: string, email: string, password: string) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await this.usersService.createOne(
            nickname,
            email,
            hashedPassword,
        );

        this.authQueueService.createUser(user.id, user.nickname);

        return user;
    }
}
