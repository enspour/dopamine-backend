import * as nodemailer from "nodemailer";

import constants from "@constants";

import configs from "@configs";

const { MAILER } = constants.injections;

const { user, pass } = configs.mailer;

export const MailerProvider = {
    provide: MAILER,
    useFactory: () => {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user,
                pass,
            },
        });

        return transport;
    },
};
