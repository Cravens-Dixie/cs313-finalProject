CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    collection_name varchar(100) NOT NULL,
    collection_owner varchar(100) NOT NULL,
    item_name TEXT  NOT NULL,
    item_description TEXT,
    size varchar,
    manufacturer varchar(100),
    price_paid money,
    date_acquired date,
    current_value money,
    photo varchar
);

--create a user table for name and password
-- https://x-team.com/blog/storing-secure-passwords-with-postgresql/ or https://blog.dbi-services.com/securely-store-passwords-in-postgresql/
CREATE EXTENSION pgcrypto; 
CREATE TABLE owners(
    id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

--insert into collections table
INSERT INTO collections(collection_name, collection_owner, item_name, item_description, size, price_paid)
VALUES ('Squishmallows', 'Catherine Cravens', 'Lavendar', 'purple rainbow cat caticorn', '16 in', '10.00'),
('Squishmallows', 'Catherine Cravens', 'Charley', 'blue llama', '16 in', '20.00'),
('Squishmallows', 'Catherine Cravens', 'Foxy', 'red fox', '16', '20.00'),
('Squishmallows', 'Catherine Cravens', 'Strawberry', 'pink rabbit', '8', '12.00'),
('Squishmallows', 'Catherine Cravens', 'Gabe', 'brown dog', '8', '12.00');

INSERT INTO collections(collection_name, collection_owner, item_name, item_description, manufacturer, price_paid)
VALUES ('Stamp Sets', 'Dixie Cravens', 'Letter-It Birthday', 'sentiment scripty', 'Ranger', '6.00'),
('Stamp Sets', 'Dixie Cravens', 'Grand Greetings', 'sentiment scripty', 'Lawn Fawn', '15.00'),
('Stamp Sets', 'Dixie Cravens', 'Confetti Background', 'backgound dots', 'Stamp Market', '18.00'),
('Stamp Sets', 'Dixie Cravens', 'So Many Snowmen', 'cartoon snowman', 'Mama Elephant', '15.00'),
('Stamp Sets', 'Dixie Cravens', 'Diagonal Pinstripe', 'background line', 'The Stamp Market', '18.00'),
('Stamp Sets', 'Dixie Cravens', 'Striped', 'background line', 'The Stamp Market', '18.00'),
('Stamp Sets', 'Dixie Cravens', 'Leaf Canopy', 'nature leaves', 'Altenew', '22.99');








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