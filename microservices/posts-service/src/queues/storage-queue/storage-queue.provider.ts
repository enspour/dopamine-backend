import { ClientProxyFactory, Transport } from "@nestjs/microservices";

import constants from "@constants";

import configs from "@configs";

const { STORAGE_QUEUE } = constants.injections;

const { urls, queue } = configs.storageQueue;

export const StorageQueueProvider = {
    provide: STORAGE_QUEUE,
    useFactory: () => {
        const client = ClientProxyFactory.create({
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: queue,
                    brokers: urls,
                },
                consumer: {
                    groupId: "posts-service",
                },
            },
        });

        return client;
    },
};
