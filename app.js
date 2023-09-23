import { Queue, Worker } from "bullmq"
import { Redis } from "ioredis"
import { addJobs, addWorker, sleep } from "./functions.js"
import { queueOptions, workerOptions } from "./config.js"

const redisConnection = new Redis(queueOptions.redisUrl)
const queue = new Queue(queueOptions.name, { connection: redisConnection })

await addJobs(queue, 100)

await sleep(1000)
const processer = async (job) => {
    console.log(`processing ${job.id}`)
    await sleep(100)
    return "output"
}

await addWorker(queueOptions.name, processer, workerOptions)

const queueCount = await queue.count()
console.log(queueCount)

// const jobState = await queue.getJob()
// console.log(jobState)

// const job = await queue.getJob(75597)
// console.log(job.returnvalue)

// const completedCount = await queue.getCompletedCount()
// console.log(a)

// await queue.clean(1000, 1000, "active");
// await queue.obliterate();