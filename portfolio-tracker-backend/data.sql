DROP DATABASE IF EXISTS portfoliodb;

CREATE DATABASE portfoliodb;

\c portfoliodb;

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email text NOT NULL,
    password text NOT NULL,
    type text NOT NULL
);

INSERT INTO users 
    (email, password, type)
VALUES
    ('Kamal','safepassword', 'admin');

INSERT INTO users
    (email, password, type)
VALUES
    ('Jasmine', 'safepassword1', 'user');

