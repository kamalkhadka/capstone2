import { symbols } from "../api.js";
import client from "../db.js";

class Symbol {
    static async getAll() {
        const syms = await symbols();

        await client.query(`
            ALTER TABLE securities DROP COLUMN symbol_id;
            TRUNCATE TABLE symbols RESTART IDENTITY;
            ALTER TABLE securities ADD COLUMN symbol_id INTEGER REFERENCES symbols`);

        Promise.all(
            syms.map(async (s) => {
                await client.query('INSERT INTO symbols (symbol, name) values ($1, $2)', [s.symbol, s.name]);
            })
          )
    }
}


export default Symbol;