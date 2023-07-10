import jwt from "./jwt.config";
import server from "./server.configs";

import mongodb from "./mongodb.config";

import authQueue from "./auth-queue.config";
import storageQueue from "./storage-queue.config";
import usersQueue from "./users-queue.config";

export default { server, jwt, mongodb, authQueue, usersQueue, storageQueue };
