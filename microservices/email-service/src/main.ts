import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

import configs from "@configs";

const { urls, queue } = configs.emailQueue;

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.RMQ,
            options: {
                urls,
                queue,
                queueOptions: {
                    durable: false,
                },
            },
        },
    );

    await app.listen();
}

bootstrap();
