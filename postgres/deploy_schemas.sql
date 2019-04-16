-- Deploy fresh db tables

\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'
\i '/docker-entrypoint-initdb.d/tables/bookToRead.sql'
\i '/docker-entrypoint-initdb.d/tables/bookReading.sql'
\i '/docker-entrypoint-initdb.d/tables/bookDone.sql'
\i '/docker-entrypoint-initdb.d/tables/reviewBook.sql'

\i '/docker-entrypoint-initdb.d/seed/seed.sql'