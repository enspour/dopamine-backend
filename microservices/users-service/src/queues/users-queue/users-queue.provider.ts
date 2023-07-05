import { ClientProxyFactory, Transport } from "@nestjs/microservices";

import configs from "@configs";

import constants from "@constants";

const { USERS_QUEUE } = constants.injections;

const { queue, urls } = configs.usersQueue;

export const UsersQueueProvider = {
    provide: USERS_QUEUE,
    useFactory: () => {
        const client = ClientProxyFactory.create({
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: queue,
                    brokers: urls,
                },
            },
        });

        return client;
    },
};
