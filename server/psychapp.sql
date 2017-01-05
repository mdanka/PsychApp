DROP DATABASE IF EXISTS psychapp;
CREATE DATABASE psychapp;

\c psychapp;

CREATE TABLE meditation (
  id SERIAL PRIMARY KEY,
  nickname VARCHAR,
  answer VARCHAR,
  date DATE
);

INSERT INTO meditation (nickname, answer, date)
  VALUES ('testuser', 'yes', '2000-01-01');

INSERT INTO meditation (nickname, answer, date)
  VALUES ('testuser', 'no', '2000-02-01');