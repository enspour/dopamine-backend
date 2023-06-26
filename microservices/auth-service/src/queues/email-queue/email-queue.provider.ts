import { ClientProxyFactory, Transport } from "@nestjs/microservices";

import constants from "@constants";

import configs from "@configs";

const { EMAIL_QUEUE } = constants.injections;

const { urls, queue } = configs.emailQueue;

export const EmailQueueProvider = {
    provide: EMAIL_QUEUE,
    useFactory: async () => {
        const client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls,
                queue,
                queueOptions: {
                    durable: false,
                },
            },
        });

        try {
            await client.connect();
        } catch (e) {
            console.log(e);
            throw new Error("[EMAIL QUEUE] Error connection");
        }

        return client;
    },
};
