import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

import { ValidationPipe } from "@pipes";

import configs from "@configs";

const { port } = configs.server;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe());

    app.setGlobalPrefix("/api/v1");

    await app.listen(port);
}

bootstrap();
