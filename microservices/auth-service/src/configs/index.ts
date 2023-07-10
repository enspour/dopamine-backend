import ec from "./ec.config";
import jwt from "./jwt.config";
import server from "./server.config";
import tfa from "./tfa.config";

import postgres from "./postgres.config";
import redis from "./redis.config";

import authQueue from "./auth-queue.config";
import emailQueue from "./email-queue.config";
import usersQueue from "./users-queue.config";

export default {
    ec,
    jwt,
    server,
    tfa,
    postgres,
    redis,
    emailQueue,
    authQueue,
    usersQueue,
};
