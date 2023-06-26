import { Inject, Injectable } from "@nestjs/common";
import { Transporter } from "nodemailer";

import constants from "@constants";

import configs from "@configs";

const { MAILER } = constants.injections;

const from = configs.mailer.user;

@Injectable()
export class MailerService {
    constructor(@Inject(MAILER) private mailer: Transporter) {}

    async sendMail(to: string, subject: string, text: string, html: string) {
        const details = {
            from,
            to,
            subject,
            text,
            html,
        };

        await this.mailer.sendMail(details);
    }
}
