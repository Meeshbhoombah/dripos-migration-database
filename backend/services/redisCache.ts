import redis from 'redis';

const client = redis.createClient();


client.on('error', (err) => {
    console.log('Redis Error: ', err);
});


export const setCache = (key: string, value: any): Promise<void> => {
    return new Promise((resolve, reject) => {
        client.set(key, value, 'EX', 3600, (err: any) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}


export const getCache = (key: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        client.get(key, (err: any, data: any) => {
            if (err) reject(err);
            resolve(JSON.parse(data as string));
        });
    });
};


