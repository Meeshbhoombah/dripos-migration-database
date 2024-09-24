import redis from 'redis';

const client = redis.createClient();


client.on('error', (err) => {
    console.log('Redis Error: ', err);
});


export const setCache = (key: string, value: any) => {
    // set with an expiration time of 1 hour (translated to seconds)
    // https://stackoverflow.com/questions/15861424/node-redis-set-with-ex-and-nx
    client.set(key, value, {
        EX: 3600 
    });
}


export const getCache = (key: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, data) => {
            if (err) reject(err);
            resolve(JSON.parse(data as string));
        });
    });
};


