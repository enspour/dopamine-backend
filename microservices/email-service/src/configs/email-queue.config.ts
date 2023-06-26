export default {
    urls: process.env.EMAIL_QUEUE_URLS?.split(",") || ["amqp://localhost:5672"],
    queue: process.env.EMAIL_QUEUE_NAME || "email_queue",
};
