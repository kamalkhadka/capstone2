import { Client } from "iexjs";
import { API_TOKEN, API_VERSION } from "./config.js";

const client = new Client({ api_token: API_TOKEN, version: API_VERSION });

export async function yesterday(symbol) {
    return await client.yesterday(symbol);
};

export async function symbols(){
    return await client.symbols();
}

export async function mostActive(){
    return await client.list("mostactive");
}

export async function winners(){
    return await client.list("gainers");
}

export async function slaggers(){
    return await client.list("losers");
}

export default client;

