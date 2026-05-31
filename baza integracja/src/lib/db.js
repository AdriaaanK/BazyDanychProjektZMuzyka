import { createClient } from 'redis'

const redisConfig = {
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  }
}

let client

if (!global.redisClient) {
  global.redisClient = createClient(redisConfig)

  global.redisClient.on('error', err => {
    console.log('Redis Client Error', err)
  })

  await global.redisClient.connect()
}

client = global.redisClient

export { client }