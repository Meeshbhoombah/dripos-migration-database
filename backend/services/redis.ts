import pc from 'picocolors';

import * as redis from 'redis';


let client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis Error: ', err);
});


export async function connect() {
    console.log("⏳ CONNECTING TO REDIS");
    await client.connect();
    console.log("✅ CONNECTED TO REDIS");
};


// Setter and getter functions for objects

export function oset(key: string, value: any) {
    // set with an expiration time of 1 hour (translated to seconds)
    // https://stackoverflow.com/questions/15861424/node-redis-set-with-ex-and-nx
    client.set(key, JSON.stringify(value), {
        EX: 3600 
    });
};

export async function oget(key: string) {
    let obj = await client.get(JSON.parse(key));
    return obj;
};


export function flushCache() {
    client.flushAll();
}

