import redis from 'redis';

const client = redis.createClient();


client.on('error', (err) => {
    console.log('Redis Error: ', err);
})


export const setCache = (key: string, value: any) => {
    client.setex(key, 3600, JSON.stringify(value));
}


export const getCache = (key: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, data))  => {
            if (err) reject(err);
            resolve(JSON.parse(data as string));
        });
    });
};


