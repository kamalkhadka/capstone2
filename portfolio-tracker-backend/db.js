import pg from "pg";
import  DB_URI from "./config.js";

let client = new pg.Client({
    connectionString: DB_URI
});

client.connect();

export default client;