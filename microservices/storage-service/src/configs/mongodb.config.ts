export default {
    host: process.env.MONGO_HOST || "localhost",
    port: parseInt(process.env.MONGO_PORT) || 27017,
    user: process.env.MONGO_USER || "mongodb",
    pass: process.env.MONGO_PASS || "secret",
    db: process.env.MONGO_DB || "dopamine_storage",
};
