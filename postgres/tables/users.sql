BEGIN TRANSACTION;

CREATE TABLE users (
	id serial PRIMARY KEY,
	name VARCHAR(100),
	email text UNIQUE NOT NULL,
	age smallint,
	city VARCHAR(100)

);

COMMIT;