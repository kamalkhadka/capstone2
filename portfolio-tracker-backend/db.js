import  pg from "pg";

let DB_URI;

if (process.env.NODE_ENV === "test") {
    DB_URI = "postgresql:///portfoliodb_test";
} else {
    DB_URI = "posgressql:///portfoliodb"
}

let db = new pg.Client({
    connectionString: DB_URI
});

db.connect();

export default db;