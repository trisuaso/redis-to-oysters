import { createClient } from "redis";
import { spawn } from "node:child_process";

const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

console.log("Starting");

for (const key of await client.keys("*")) {
    const value = await client.get(key);
    spawn("oysters-cli", ["insert", key, value], {
        detached: true,
        shell: false,
    });
}

console.log("Finished");
