import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

import { connectStorageQueue } from "@loaders/connectStorageQueue";

import { ValidationPipe } from "@pipes";

import configs from "@configs";

const { port } = configs.server;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.setGlobalPrefix("/api/v1");

    app.useGlobalPipes(new ValidationPipe());

    connectStorageQueue(app);

    await app.startAllMicroservices();
    await app.listen(port);
}

bootstrap();
