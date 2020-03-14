CREATE TABLE collection (
    id SERIAL PRIMARY KEY,
    collection_name varchar(100) NOT NULL,
    collection_owner varchar(100) NOT NULL,
    item_name TEXT  NOT NULL,
    item_description TEXT,
    size varchar,
    manufacturer/company varchar(100),
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

-- local only
CREATE USER catherine WITH PASSWORD 'jinx';
GRANT SELECT, INSERT, UPDATE ON squishmallows TO catherine;
GRANT USAGE, SELECT ON SEQUENCE squishmallows_id_seq TO catherine;