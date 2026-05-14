import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'NLvmh337cJCPoGFbGS29F9mdcaqdOBu1',
    socket: {
        host: 'redis-14861.c98.us-east-1-4.ec2.cloud.redislabs.com',
        port: 14861
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

export { client }