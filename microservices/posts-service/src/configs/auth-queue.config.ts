export default {
    urls: process.env.AUTH_QUEUE_URLS?.split(",") || ["localhost:9092"],
    queue: process.env.AUTH_QUEUE_NAME || "auth_queue",
};
