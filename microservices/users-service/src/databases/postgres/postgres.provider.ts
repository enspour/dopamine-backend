import { DataSource } from "typeorm";

import constants from "@constants";

import configs from "@configs";

const { POSTGRES } = constants.injections;

const { host, port, password, username, database } = configs.postgres;

export const PostgresProvider = {
    provide: POSTGRES,
    useFactory: async () => {
        const db = new DataSource({
            type: "postgres",
            host,
            port,
            username,
            password,
            database,
            entities: [__dirname + "/entities/**/*.entity{.ts,.js}"],
            synchronize: true,
        });

        return await db.initialize();
    },
};
