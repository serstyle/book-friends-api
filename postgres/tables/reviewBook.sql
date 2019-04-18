BEGIN TRANSACTION;

CREATE TABLE reviewbook (
	id serial PRIMARY KEY,
	userid int NOT NULL,
	name text NOT NULL,
	bookid text,
	booktitle text,
	note smallint,
	review text
);

COMMIT;