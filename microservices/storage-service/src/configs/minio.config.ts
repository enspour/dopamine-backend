export default {
    host: process.env.MINIO_HOST || "localhost",
    port: parseInt(process.env.MINIO_PORT) || 9000,
    user: process.env.MINIO_ROOT_USER || "dopamine",
    password: process.env.MINIO_ROOT_PASSWORD || "secret_password",
};
