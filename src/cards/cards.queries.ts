export const cardQueries = {

    readCards: `SELECT id AS cardId, deckid AS deckId, image, question, answer FROM flashcardsdb.cards`,

    readCardsByDeckId: `SELECT id AS cardId, deckid AS deckId, image, question, answer FROM flashcardsdb.cards WHERE deckId = ?`,

    readCardsByQuestionSearch: `SELECT id AS cardId, deckid AS deckId, image, question, answer FROM flashcardsdb.cards WHERE question LIKE ?`,

    readCardsByCardId: `SELECT id AS cardId, deckid AS deckId, image, question, answer FROM flashcardsdb.cards WHERE id = ?`,

    createCard: `INSERT INTO flashcardsdb.cards (deckid, image, question, answer) VALUES (?, ?, ?, ?)`,

    updateCard: `UPDATE flashcardsdb.cards SET image = ?, question = ?, answer = ? WHERE id = ?`,

    deleteCard: `DELETE FROM flashcardsdb.cards WHERE id = ?`
}
