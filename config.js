import { config } from "dotenv";
config()

export const queueOptions = {
    name: process.env.QUEUE_NAME,
    redisUrl: process.env.REDIS_URL
}

export const workerOptions = {
    maxCompleteCount: +process.env.MAX_COMPLETE,
    maxCompleteTime: +process.env.MAX_COMPLETE_TIME,
    maxFaildCount: +process.env.MAX_FAILD,
    maxFaildTime: +process.env.MAX_FAILD_TIME,
    quantity: +process.env.WORKERS_COUNT
}
