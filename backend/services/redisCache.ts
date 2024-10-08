import * as redis from 'redis';

const client = redis.createClient();
client.connect();

client.on('error', (err) => {
    console.log('Redis Error: ', err);
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


