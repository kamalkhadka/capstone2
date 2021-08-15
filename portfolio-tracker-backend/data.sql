DROP DATABASE IF EXISTS portfoliodb;

CREATE DATABASE portfoliodb;

\c portfoliodb;

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    active BOOLEAN NOT NULL DEFAULT (true)
);

INSERT INTO users 
    (email, password, role)
VALUES
    ('admin@portfoliotracker.com','$2b$12$GC80craVooby6kJ.EitTP.lDQmZDTNFDA.pym31k2tG6GZrQbqaaC', 'admin');

INSERT INTO users
    (email, password)
VALUES
    ('user1@portfoliotracker.com', '$2b$12$QxTkS94uHsTFVfFX9E8qReJGKoReqX8OsQulNZ9Hu0DbpGB/MBLMe');

