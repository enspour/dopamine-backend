import { Injectable } from "@nestjs/common";

import { EmailQueueService } from "@email-queue/email-queue.service";

import { UsersEmailsRepository } from "@postgres/repositories/users-emails.repository";
import { ECCodesRepository } from "@redis/repositories/ec-codes.repositories";

import { UserEmail } from "@interfaces";

import { generateCode } from "@utils";

@Injectable()
export class UsersEmailsService {
    constructor(
        private usersEmailsRepository: UsersEmailsRepository,
        private ecCodesRepository: ECCodesRepository,
        private emailQueueService: EmailQueueService,
    ) {}

    async confirmEmail(userId: number, emailId: number, code: string) {
        const id = await this.ecCodesRepository.get(userId, code);

        if (id === emailId) {
            await this.usersEmailsRepository.updateConfirm(userId, id, true);

            await this.ecCodesRepository.remove(userId, code);

            return id;
        }

        return 0;
    }

    async sendConfirmationEmail(
        userId: number,
        email: Pick<UserEmail, "id" | "email">,
    ) {
        const code = generateCode();

        await this.ecCodesRepository.save(userId, code, email.id);

        this.emailQueueService.sendECCode(email.email, code);
    }

    async findAll(userId: number) {
        return await this.usersEmailsRepository.findAll(userId);
    }

    async createOne(userId: number, email: string) {
        return await this.usersEmailsRepository.createOne(userId, email);
    }

    async removeOne(userId: number, emailId: number) {
        return await this.usersEmailsRepository.removeOne(userId, emailId);
    }
}
