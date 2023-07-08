import * as minio from "minio";

import constants from "@constants";

import configs from "@configs";

const { MINIO } = constants.injections;

const { host: url, port, user, password } = configs.minio;

export const MinioProvider = {
    provide: MINIO,
    useFactory: () => {
        const client = new minio.Client({
            port,
            endPoint: url,
            accessKey: user,
            secretKey: password,
            useSSL: false,
        });

        return client;
    },
};
