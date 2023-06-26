import { Injectable } from "@nestjs/common";

import { MailerService } from "./mailer/mailer.service";

import configs from "@configs";

const { environment } = configs.server;

@Injectable()
export class AppService {
    constructor(private mailerService: MailerService) {}

    async sendEmailConfirmationCode(email: string, code: string) {
        const subject = "Dopamine | Email confirmation";
        const text = "";
        const html = "";

        if (environment === "development") {
            console.log("EC:", code);
        }

        if (environment === "production") {
            await this.mailerService.sendMail(email, subject, text, html);
        }
    }

    async sendTFACode(email: string, code: string) {
        const subject = "Dopamine | Two Factor Authorization";
        const text = "";
        const html = "";

        if (environment === "development") {
            console.log("TFA:", code);
        }

        if (environment === "production") {
            await this.mailerService.sendMail(email, subject, text, html);
        }
    }
}
