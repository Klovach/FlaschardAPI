export const deckQueries = {
            readDecks: `SELECT id as deckId, userid AS userId, image AS image, name AS name, description AS description FROM flashcardsdb.decks`,

            readDeckByNameSearch: `SELECT id as deckId, userId AS userId, image AS image, name AS name, description AS description FROM flashcardsdb.decks WHERE flashcardsdb.decks.name LIKE ?`,
            
            getDeckByDeckId: `SELECT id as deckId, userid AS userId, image AS image, name AS name, description AS description FROM flashcardsdb.decks WHERE flashcardsdb.decks.id = ?`,

            getDecksByUserId: `SELECT id as deckId, userid AS userId, image AS image, name AS name, description AS description FROM flashcardsdb.decks WHERE flashcardsdb.decks.userid = ?`,

            createDeck: `INSERT INTO flashcardsdb.decks (userid, image, name, description) VALUES(?, ?, ?, ?)`,

            updateDeck: `UPDATE flashcardsdb.decks SET image = ?, name = ?, description = ? WHERE id = ?`,

            deleteDeck: `DELETE FROM flashcardsdb.decks WHERE id = ?`
        }
        
