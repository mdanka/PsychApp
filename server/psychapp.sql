DROP DATABASE IF EXISTS psychapp;
CREATE DATABASE psychapp;

\c psychapp;

CREATE TABLE meditation (
  id SERIAL PRIMARY KEY,
  nickname VARCHAR,
  answer VARCHAR,
  date TIMESTAMP WITH TIME ZONE
);

INSERT INTO meditation (nickname, answer, date)
  VALUES ('testuser', 'yes', '2000-01-01T00:00:00.000Z');

INSERT INTO meditation (nickname, answer, date)
  VALUES ('testuser', 'no', '2000-01-01T00:00:00.000Z');

GRANT ALL PRIVILEGES ON DATABASE psychapp TO psychapp;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO psychapp;

GRANT USAGE, SELECT ON SEQUENCE meditation_id_seq TO psychapp;
