import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("Please add MONGODB_URI to .env.local");
}

export const client = new MongoClient(uri);
export const db = client.db("bazar-dor");