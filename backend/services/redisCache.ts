import * as redis from 'redis';

const client = redis.createClient();
client.connect();

client.on('error', (err) => {
    console.log('Redis Error: ', err);
});


export const setCache = async (key: string, value: any) => {
    client.set(key, JSON.stringify(value), {
        EX: 3600 
    });
}


export const getCache = async (key: string): Promise<any> => {
    return await client.get(key);
};


