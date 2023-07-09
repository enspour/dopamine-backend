import authQueue from "./auth-queue.config";
import jwt from "./jwt.config";
import minio from "./minio.config";
import mongodb from "./mongodb.config";
import server from "./server.configs";
import storageQueue from "./storage-queue.config";

export default { server, jwt, mongodb, minio, storageQueue, authQueue };
