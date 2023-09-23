import { Worker } from "bullmq"

export const addWorker = async (queueName, processer, options) => {
    const workerOptions = {
        autorun: false,
        concurrency: options.quantity,
        removeOnComplete: {
            age: options.maxCompleteTime,
            count: options.maxCompleteCount
        },
        removeOnFail: {
            age: options.maxCompleteTime,
            count: options.maxCompleteCount
        },
    }

    const worker = new Worker(
        queueName,
        processer,
        workerOptions)

    worker.run()

    worker.on('completed', (job, returnvalue) => {
        console.log(`completed ${job.id}\n`)
    })

    worker.on('error', (err) => {
        console.error(err);
    });

    return worker
}

export const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("")
        }, ms);
    })
}

export const addJobs = async (queue, count) => {
    let jobCount = 0
    while (true) {
        const newJob = {
            message: "sa",
            userId: Math.floor(Math.random() * 1000)
        }
        const addedJob = await queue.add("JobName", newJob)
        console.log(`job added: ${addedJob.id}`)

        jobCount++
        if (jobCount > count) {
            console.log(`${count} jobs added`)
            break;
        }
    }
}