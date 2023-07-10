import jwt from "./jwt.config";
import server from "./server.configs";

import minio from "./minio.config";
import mongodb from "./mongodb.config";

import authQueue from "./auth-queue.config";
import storageQueue from "./storage-queue.config";

export default { server, jwt, mongodb, minio, storageQueue, authQueue };
