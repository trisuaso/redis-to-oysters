import { createClient } from "redis";
import { spawn } from "node:child_process";

const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

console.log("Starting");

for (const key of await client.keys("*")) {
    const value = await client.get(key);
    await fetch(`http://localhost:5072/${key}`, {
        method: "POST",
        body: value,
    });
}

console.log("Finished");
