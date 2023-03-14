DROP TABLE IF EXISTS pets;

CREATE TABLE pets(
    id SERIAL,
    age INTEGER,
    name TEXT,
    kind TEXT
);

-- INSERT INTO pets(age, name, kind) VALUES(5, 'buttons', 'snake')