export default {
    urls: process.env.USERS_QUEUE_URLS?.split(",") || ["localhost:9092"],
    queue: process.env.USERS_QUEUE_NAME || "users_queue",
};
