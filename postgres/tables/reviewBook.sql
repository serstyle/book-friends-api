BEGIN TRANSACTION;

CREATE TABLE reviewbook (
	id serial PRIMARY KEY,
	email text NOT NULL,
	bookid text,
	note smallint,
	review text
);

COMMIT;