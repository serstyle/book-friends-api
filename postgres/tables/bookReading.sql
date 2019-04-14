BEGIN TRANSACTION;

CREATE TABLE bookreading (
	id serial PRIMARY KEY,
	email text NOT NULL,
	bookid text,
	title text,
	authors text,
	description text
);

COMMIT;