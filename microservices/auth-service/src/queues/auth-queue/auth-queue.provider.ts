import { ClientProxyFactory, Transport } from "@nestjs/microservices";

import constants from "@constants";

import configs from "@configs";

const { AUTH_QUEUE } = constants.injections;

const { urls, queue } = configs.authQueue;

export const AuthQueueProvider = {
    provide: AUTH_QUEUE,
    useFactory: async () => {
        const client = ClientProxyFactory.create({
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: "auth-service",
                    brokers: urls,
                },
                consumer: {
                    groupId: queue,
                },
            },
        });

        return client;
    },
};
