import { symbols } from "../api.js";
import client from "../db.js";

class Symbol {
    static async getAll() {

        const results = await client.query('SELECT onDate FROM symbols LIMIT 1');

        

        if (results.rows[0]) {
            
            const today = new Date();
            const dbDate = new Date(results.rows[0].ondate);

            if (today.getDate() === dbDate.getDate()
                && today.getMonth() === dbDate.getMonth()
                && today.getFullYear() === dbDate.getFullYear()) {
                console.log("No need to recheck if date is same");
                return;
            }

        }

        console.log("Inserting symbols");

        const syms = await symbols();

        await client.query(`TRUNCATE TABLE symbols RESTART IDENTITY`);

        Promise.all(
            syms.map(async (s) => {
                await client.query('INSERT INTO symbols (symbol, name) values ($1, $2)', [s.symbol, s.name]);
            })
        )
    }
}


export default Symbol;