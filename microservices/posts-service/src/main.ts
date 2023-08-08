import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

import { connectAuthQueue } from "@loaders/connect-auth-queue";
import { connectUsersQueue } from "@loaders/connect-users-queue";

import configs from "@configs";

const { port } = configs.server;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.setGlobalPrefix("/api/v1");

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    connectAuthQueue(app);
    connectUsersQueue(app);

    await app.startAllMicroservices();
    await app.listen(port);
}

bootstrap();
