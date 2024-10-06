import * as redis from 'redis';

const client = redis.createClient();


client.on('error', (err) => {
    console.log('Redis Error: ', err);
});


export const setCache = (key: string, value: any) => {
    client.set(key, value, {
        EX: 3600 
    });
}


export const getCache = (key: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        client.get(key);
    });
};


