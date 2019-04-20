BEGIN TRANSACTION;

CREATE TABLE follow (
	id serial PRIMARY KEY,
	user_id int NOT NULL,
	follow_by_id int NOT NULL
);

COMMIT;