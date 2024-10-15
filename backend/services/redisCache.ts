import pc from 'picocolors';
import * as redis from 'redis';


console.log('⏳ CREATING REDIS CLIENT');
const client = redis.createClient();
client.connect();
console.log('✅ CREATED REDIS CLIENT');


client.on('error', (err) => {
    console.error('Redis Error: ', err);
});


export const setCache = (key: string, value: any) => {
    // set with an expiration time of 1 hour (translated to seconds)
    // https://stackoverflow.com/questions/15861424/node-redis-set-with-ex-and-nx
    client.set(key, JSON.stringify(value), {
        EX: 3600 
    });
}


export const getCache = async (key: string): Promise<any> => {
    return await client.get(key);
};


export const flushCache = () => {
    client.flushAll();
}

