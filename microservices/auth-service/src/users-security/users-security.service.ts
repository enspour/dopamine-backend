import { Injectable } from "@nestjs/common";
import { UsersSecurityRepository } from "@postgres/repositories/users-security.repository";

@Injectable()
export class UsersSecurityService {
    constructor(private usersSettingsRepository: UsersSecurityRepository) {}

    async updateTFAByEmail(userId: number, value: boolean) {
        return await this.usersSettingsRepository.updateTFAByEmail(
            userId,
            value,
        );
    }
}
