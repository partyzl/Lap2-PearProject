DROP TABLE IF EXISTS posts;

CREATE TABLE posts(
    id serial PRIMARY KEY,
    title varchar(50) NOT NULL,
    pseudonym varchar(50) NOT NULL,
    body varchar(500) NOT NULL
);