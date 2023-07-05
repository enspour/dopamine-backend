import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

import { connectUsersQueue } from "@loaders/connect-users-queue";

import { ValidationPipe } from "@pipes";

import configs from "@configs";

const { port } = configs.server;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe());

    app.setGlobalPrefix("/api/v1");

    connectUsersQueue(app);

    await app.startAllMicroservices();
    await app.listen(port);
}

bootstrap();
