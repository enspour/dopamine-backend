import { INestApplication } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import configs from "@configs";

const { urls, queue } = configs.usersQueue;

export const connectUsersQueue = (app: INestApplication) => {
    app.connectMicroservice<MicroserviceOptions>({
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
};
