export default {
    host: process.env.PG_HOST || "localhost",
    port: parseInt(process.env.PG_PORT) || 5432,
    username: process.env.PG_USERNAME || "postgres",
    password: process.env.PG_PASSWORD || "root",
    database: process.env.PG_DATABASE || "dopamine",
};
