import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Card } from './cards.model';
import { cardQueries } from './cards.queries';


export const readCards = async () => {
    return execute<Card[]>(cardQueries.readCards, []);
};

export const readCardsByDeckId = async (deckid: number) => {
    return execute<Card[]>(cardQueries.readCardsByDeckId, [deckid]);
};

export const readCardsByCardId = async (cardId: number) => {
    try {
        return await execute<Card[]>(cardQueries.readCardsByCardId, [cardId]);
    } catch (error) {
        console.error('[cards.dao][readCardsByDeckId] Error:', error);
        throw new Error('Failed to fetch cards by deckId.');
    }
};

export const readCardsByQuestionSearch = async (search: string) => {
    console.log('search param: read by search', search);
    return execute<Card[]>(cardQueries.readCardsByQuestionSearch, [search]);
};


export const createCard = async (card: Card, index: number, deckId: number) => {
    return execute(cardQueries.createCard, [
        deckId,
        card.image,
        card.question,
        card.answer,
    ]);
};

export const updateCard = async (card: Card) => {
    return execute(cardQueries.updateCard, [
        card.image,
        card.question,
        card.answer,
        card.cardId,
    ]);
};

export const deleteCard = async (cardId: number) => {
    return execute(cardQueries.deleteCard, [cardId]);
};
