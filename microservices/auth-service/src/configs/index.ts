import authQueue from "./auth-queue.config";
import ec from "./ec.config";
import emailQueue from "./email-queue.config";
import jwt from "./jwt.config";
import postgres from "./postgres.config";
import redis from "./redis.config";
import server from "./server.config";
import tfa from "./tfa.config";

export default { server, jwt, postgres, redis, emailQueue, authQueue, ec, tfa };
