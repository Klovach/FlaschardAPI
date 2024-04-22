import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Deck } from './decks.model';
import { deckQueries } from './decks.queries';

export const readDecks = async () => {
    return execute<Deck[]>(deckQueries.readDecks, []);
};

export const readDecksByNameSearch = async (search: string) => {
    console.log('search param: read by  search', search);
    return execute<Deck[]>(deckQueries.readDeckByNameSearch, [search]);
};

export const readDecksByDeckId = async (deckId: number) => {
    try {
        return await execute<Deck[]>(deckQueries.getDeckByDeckId, [deckId]);
    } catch (error) {
        console.error('[decks.dao][readDecksByDeckId] Error:', error);
        throw new Error('Failed to fetch deck by deckId.');
    }
};

export const readDeckByUserId = async (userId: number) => {
    try {
        return await execute<Deck[]>(deckQueries.getDecksByUserId, [userId]);
    } catch (error) {
        console.error('[decks.dao][readDeckByUserId] Error:', error);
        throw new Error('Failed to fetch decks by userId.');
    }
};

export const createDeck = async (deck: Deck) => {
    try {
        return await execute<OkPacket>(deckQueries.createDeck, [
            deck.userId,
            deck.image,
            deck.name,
            deck.description
        ]);
    } catch (error) {
        console.error('[decks.dao][createDeck] Error:', error);
        throw new Error('Failed to create deck.');
    }
};


export const updateDeck = async (deck: Deck) => {
    try {
        return await execute<OkPacket>(deckQueries.updateDeck, [
            deck.image,
            deck.name,
            deck.description,
            deck.deckId,
        ]);
    } catch (error) {
        console.error('[decks.dao][updateDeck] Error:', error);
        throw new Error('Failed to update deck.');
    }
};

export const deleteDeck = async (deckId: number) => {
    try {
        return await execute<OkPacket>(deckQueries.deleteDeck, [deckId]);
    } catch (error) {
        console.error('[decks.dao][deleteDeck] Error:', error);
        throw new Error('Failed to delete deck.');
    }
};
