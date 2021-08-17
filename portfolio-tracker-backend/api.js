import { Client } from "iexjs";
import { API_TOKEN, API_VERSION } from "./config.js";

const client = new Client({ api_token: API_TOKEN, version: API_VERSION });

export async function yesterday(symbol) {
    return await client.yesterday("AAPL");
};

export async function symbols(){
    return await client.symbols();
}

export default client;

