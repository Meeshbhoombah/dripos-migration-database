import * as redis from 'redis';

const client = redis.createClient();


client.on('error', (err) => {
    console.log('Redis Error: ', err);
});


export const setCache = (key: string, value: any) => {
    // https://stackoverflow.com/questions/15861424/node-redis-set-with-ex-and-nx
    // set with an expiration time of 1 hour (translated to seconds)
    client.set(key, value, {
        EX: 3600 
    });
}


export const getCache = (key: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        client.get(key);
    });
};

