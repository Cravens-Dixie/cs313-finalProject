--final project DB is on heroku serene-hamlet-16817
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
--bcrypt: https://github.com/kelektiv/node.bcrypt.js#usage
CREATE EXTENSION pgcrypto; 
CREATE TABLE collection_owners(
    id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

--insert into collection_owners table
INSERT INTO collection_owners(username, password)
VALUES ('Dixie Cravens', crypt('cs313', gen_salt('bf')));
INSERT INTO collection_owners(username, password)
VALUES ('Catherine Cravens', crypt('cs313', gen_salt('bf')));

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

INSERT INTO collections(collection_name, collection_owner, item_name, item_description, manufacturer, price_paid)
VALUES ('Steel Dies', 'Dixie Cravens', 'Stitched Circles Cover Panel', 'background dots', 'Reverse Confetti', '25.00');
INSERT INTO collections(collection_name, collection_owner, item_name, item_description, manufacturer, price_paid)
VALUES ('Steel Dies', 'Dixie Cravens', 'Rose Flurries', 'floral layering', 'Altenew', '29.00'),
('Steel Dies', 'Dixie Cravens', 'Garden Picks', 'floral layering', 'Altenew', '29.00'),
('Steel Dies', 'Dixie Cravens', 'Rainbow Wishes', 'rainbow weather landscape matching', 'Concord & 9th', '12.49'),
('Steel Dies', 'Dixie Cravens', 'Wonderful Florals', 'floral sentiment matching', 'Concord & 9th', '6.49'),
('Steel Dies', 'Dixie Cravens', 'Skinny Upper Alpha', 'alphabet', 'The Stamp Market', '42.79');

INSERT INTO collections(collection_name, collection_owner, item_name, item_description, manufacturer, size, price_paid)
VALUES ('Distress Ink', 'Dixie Cravens', 'Broken China', 'blue', 'Ranger', 'mini', '3.99');
INSERT INTO collections(collection_name, collection_owner, item_name, item_description, manufacturer, size, price_paid)
VALUES ('Distress Ink', 'Dixie Cravens', 'Salty Ocean', 'blue', 'Ranger', 'mini', '3.99'),
('Distress Ink', 'Dixie Cravens', 'Twisted Citron', 'green', 'Ranger', 'mini', '3.99'),
('Distress Ink', 'Dixie Cravens', 'Mowed Lawn', 'green', 'Ranger', 'mini', '3.99'),
('Distress Ink', 'Dixie Cravens', 'Mustard Seed', 'yellow', 'Ranger', 'mini', '3.99'),
('Distress Ink', 'Dixie Cravens', 'Scattered Straw', 'yellow', 'Ranger', 'mini', '3.99'),
('Distress Ink', 'Dixie Cravens', 'Peacock Feathers', 'blue', 'Ranger', 'full', '5.99'),
('Distress Ink', 'Dixie Cravens', 'Peacock Feathers', 'blue', 'Ranger', 'mini', '3.99'),
('Distress Ink', 'Dixie Cravens', 'Picked Raspberry', 'pink', 'Ranger', 'full', '5.99'),
('Distress Ink', 'Dixie Cravens', 'Picked Raspberry', 'pink', 'Ranger', 'mini', '3.99');


--getCollectionByName
SELECT item_name, item_description FROM collections WHERE collection_name = 'Squishmallows';
--getCollectionByOwner
SELECT DISTINCT collection_name FROM collections WHERE collection_owner = 'Dixie Cravens';
--searchForUser(with password)
SELECT (password = crypt('cs313', password)) AS pwd_match
FROM collection_owners
WHERE username = 'Dixie Cravens';

--addItem
INSERT INTO collections(collection_name, collection_owner, item_name, item_description)
VALUES ('Distress Ink', 'Dixie Cravens', 'Broken China', 'blue'');




--not using this format for project
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