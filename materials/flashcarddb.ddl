-- Drop the database if it exists
DROP DATABASE IF EXISTS flashcardsdb;

-- Create the database
CREATE DATABASE flashcardsdb;

-- Use the database
USE flashcardsdb;

-- Create the User table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255)
);

-- Create the Deck table
CREATE TABLE Decks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    image VARCHAR(255),
    name VARCHAR(255),
    description TEXT,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create the Card table
CREATE TABLE Cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deckId INT,
    image VARCHAR(255),
    question TEXT,
    answer TEXT,
    FOREIGN KEY (deckId) REFERENCES Decks(id) ON DELETE CASCADE
);

-- Users
INSERT INTO Users (email, password) VALUES ('user1@example.com', 'password1');
INSERT INTO Users (email, password) VALUES ('user2@example.com', 'password2');
INSERT INTO Users (email, password) VALUES ('user3@example.com', 'password3');
INSERT INTO Users (email, password) VALUES ('user4@example.com', 'password4');
INSERT INTO Users (email, password) VALUES ('user5@example.com', 'password5');

-- Decks
INSERT INTO Decks (userId, image, name, description) VALUES (1, 'deck1.jpg', 'Geography', 'Description for Deck 1');
INSERT INTO Decks (userId, image, name, description) VALUES (1, 'deck2.jpg', 'Science', 'Description for Deck 2');
INSERT INTO Decks (userId, image, name, description) VALUES (2, 'deck3.jpg', 'Literature', 'Description for Deck 3');
INSERT INTO Decks (userId, image, name, description) VALUES (2, 'deck3.jpg', 'Astronomy', 'Description for Deck 4');
INSERT INTO Decks (userId, image, name, description) VALUES (2, 'deck3.jpg', 'Algebra', 'Description for Deck 5');

-- Cards
INSERT INTO Cards (deckId, image, question, answer) VALUES (1, 'card1.jpg', 'What is the capital of France?', 'Paris');
INSERT INTO Cards (deckId, image, question, answer) VALUES (1, 'card2.jpg', 'What is the capital of Germany?', 'Berlin');
INSERT INTO Cards (deckId, image, question, answer) VALUES (2, 'card3.jpg', 'What is the capital of Spain?', 'Madrid');
INSERT INTO Cards (deckId, image, question, answer) VALUES (3, 'card4.jpg', 'What is the capital of Italy?', 'Rome');

