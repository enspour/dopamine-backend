import { INestApplication } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import configs from "@configs";

const { urls, queue } = configs.storageQueue;

export const connectStorageQueue = (app: INestApplication) => {
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: queue,
                brokers: urls,
            },
            consumer: {
                groupId: "storage-service",
            },
        },
    });
};
