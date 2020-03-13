CREATE TABLE collection (
    id SERIAL PRIMARY KEY,
    name TEXT  NOT NULL,
    description TEXT,
    price_paid money,
    date_acquired date,
    current_value money,
    photo varchar
);

CREATE TABLE stamp_sets (
    company varchar(100),
    INHERITS (collection)
);

CREATE TABLE squishmallows (
    id SERIAL PRIMARY KEY,
    name TEXT  NOT NULL,
    description TEXT,
    size int,
    price_paid money,
    date_acquired date,
    current_value money,
    photo varchar
);

INSERT INTO squishmallows(name, description, size, price_paid)
VALUES ('Lavendar', 'purple rainbow cat caticorn', '16', '10.00');

INSERT INTO squishmallows(name, description, size, price_paid)
VALUES ('Charley', 'blue llama', '16', '20.00'),
 ('Foxy', 'red fox', '16', '20.00'),
 ('Strawberry', 'pink rabbit', '8', '12.00'),
 ('Gabe', 'brown dog', '8', '12.00');

CREATE USER catherine WITH PASSWORD 'jinx';
GRANT SELECT, INSERT, UPDATE ON squishmallows TO catherine;
GRANT USAGE, SELECT ON SEQUENCE squishmallows_id_seq TO catherine;