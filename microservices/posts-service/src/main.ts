import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

import { ValidationPipe } from "@pipes";

import configs from "@configs";

const { port } = configs.server;

const { urls, queue } = configs.authQueue;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.setGlobalPrefix("/api/v1");

    app.useGlobalPipes(new ValidationPipe());

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

    await app.startAllMicroservices();
    await app.listen(port);
}

bootstrap();
