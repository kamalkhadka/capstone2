DROP DATABASE IF EXISTS portfoliodb;

CREATE DATABASE portfoliodb;

\c portfoliodb;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    active BOOLEAN NOT NULL DEFAULT (true)
);

INSERT INTO users 
    (email, password,firstName, lastName, role)
VALUES
    ('admin@portfoliotracker.com',
    '$2b$12$GC80craVooby6kJ.EitTP.lDQmZDTNFDA.pym31k2tG6GZrQbqaaC', 
    'admin', 
    'admin', 
    'admin');

INSERT INTO users
    (email, password, firstName, lastName)
VALUES
    ('user1@portfoliotracker.com', 
    '$2b$12$QxTkS94uHsTFVfFX9E8qReJGKoReqX8OsQulNZ9Hu0DbpGB/MBLMe', 
    'FirstName', 
    'LastName');

DROP TABLE IF EXISTS symbols CASCADE;

CREATE TABLE symbols(
    id SERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    name TEXT NOT NULL,
    onDate DATE NOT NULL DEFAULT(current_date)
);

DROP TABLE IF EXISTS securities CASCADE;

CREATE TABLE securities 
(
    id SERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_users
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
	  ON DELETE CASCADE
);

-- INSERT INTO securities
--     (symbol, quantity, user_id)
-- VALUES
--     ('APPL', 10, 2);

-- INSERT INTO securities
--     (symbol, quantity, user_id)
-- VALUES
--     ('MSFT', 12, 2);

DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions(
    id SERIAL PRIMARY KEY,
    price NUMERIC NOT NULL,
    quantity INTEGER NOT NULL,
    -- user_id INTEGER NOT NULL,
    security_id INTEGER NOT NULL,
    --  CONSTRAINT fk_user_transaction
    --   FOREIGN KEY(user_id) 
	--   REFERENCES users(id)
	--   ON DELETE CASCADE,
    CONSTRAINT fk_security
      FOREIGN KEY(security_id) 
	  REFERENCES securities(id)
	  ON DELETE CASCADE
);





