export default {
    urls: process.env.STORAGE_QUEUE_URLS?.split(",") || ["localhost:9092"],
    queue: process.env.STORAGE_QUEUE_NAME || "storage_queue",
};
