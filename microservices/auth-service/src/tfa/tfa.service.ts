import { UserEmail } from "@interfaces";
import { Injectable } from "@nestjs/common";

import { EmailQueueService } from "@email-queue/email-queue.service";

import { TFACodesRepository } from "@redis/repositories/tfa-codes.repository";

import { generateCode } from "@utils";

@Injectable()
export class TFAService {
    constructor(
        private emailQueueService: EmailQueueService,
        private tfaCodesRepository: TFACodesRepository,
    ) {}

    async confirm(userId: number, code: string) {
        const isExists = await this.tfaCodesRepository.isExists(userId, code);

        if (isExists) {
            await this.tfaCodesRepository.remove(userId, code);
            return true;
        }

        return false;
    }

    async sendConfirmationEmail(userId: number, emails: UserEmail[]) {
        const code = generateCode();

        await this.tfaCodesRepository.save(userId, code);

        for (let { confirm, email } of emails) {
            if (confirm) {
                this.emailQueueService.sendTFACode(email, code);
            }
        }

        return code;
    }
}
