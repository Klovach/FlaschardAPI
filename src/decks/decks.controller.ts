import { Request, RequestHandler, Response } from 'express';
import { Deck } from './decks.model';
import * as DeckDao from './decks.dao';
import { OkPacket } from 'mysql';
import * as CardDao from '../cards/cards.dao';
import { Card } from '../cards/cards.model';

export const createDeck: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await DeckDao.createDeck(req.body);
        console.log('req.body:', req.body);
        req.body.cards.forEach(async (card: Card, index: number) => {
            try {
                await CardDao.createCard(card, index, okPacket.insertId);
            } catch (error) {
                console.error('[decks.controller][createDeckCards][Error] ', error);
                res.status(500).json({ message: 'There was an error when writing deck cards' });
            }
        });
        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[decks.controller][createDeck] [Error] ', error);
        res.status(500).json({ message: 'There was an error when writing decks' });
    }
};

export const deleteDeck: RequestHandler = async (req: Request, res: Response) => {
    try {
        let deckId = parseInt(req.params.deckId as string);
        
        if (!Number.isNaN(deckId)) {
            const response = await DeckDao.deleteDeck(deckId);
            
            return res.status(200).json(response); 
        } else {
            throw new Error("Integer expected for deckId");
        }
        
    } catch (error) {
        console.error('[decks.controller][deleteDeck][Error] ', error);
        res.status(500).json({ message: 'There was an error when deleting the deck' });
    }
};

export const readDecks: RequestHandler = async (req: Request, res: Response) => {
    try {
        let decks;
        let deckId = parseInt(req.query.deckId as string);

        if (Number.isNaN(deckId)) {
            console.log('deckId', deckId);
            decks = await DeckDao.readDecks();
        } else {
            decks = await DeckDao.readDecksByDeckId(deckId);
        }
        await readCards(decks, res);
        
        res.status(200).json(decks);
    } catch (error) {
        console.error('[decks.controller][readDecks][Error] ', error);
        console.error("[decks.controller] [deleteDeck] [Error] ", error);
        return res.status(500).json({ message: 'There was an error when deleting decks' });
    }
};

export const readDecksByNameSearch: RequestHandler = async (req: Request, res: Response) => {
    try {
        const decks = await DeckDao.readDecksByNameSearch('%' + req.params.search + '%');
        await readCards(decks, res);

        res.status(200).json(decks);
    } catch (error) {
        console.error('[decks.controller][readDecks][Error] ', error);
        res.status(500).json({ message: 'There was an error when fetching decks' });
    }
};


export const updateDeck: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await DeckDao.updateDeck(req.body);
        console.log('req.body', req.body);
        console.log('deck', okPacket);
        for (const card of req.body.cards) {
            try {
                await CardDao.updateCard(card); 
            } catch (error) {
                console.error('[decks.controller][updateDeck][Error] ', error);
                return res.status(500).json({ message: 'There was an error when updating deck cards' }); // Return inside catch block to stop further execution
            }
        }
        return res.status(200).json(okPacket);
    } catch (error) {
        console.error('[decks.controller][updateDeck] [Error] ', error);
        return res.status(500).json({ message: 'There was an error when updating decks' }); // Return inside catch block to stop further execution
    }
};

async function readCards(decks: Deck[], res: Response<any, Record<string, any>>) {
    console.log('decks', decks);
    for (let i = 0; i < decks.length; i++) {
       try {
        const cards = await CardDao.readCardsByDeckId(decks[i].deckId); 
        console.log('decks[i].deckId', decks[i].deckId); 
        decks[i].cards = cards;
       }
         catch (error) {
          console.error('[decks.controller][readDecks][Error] ', error);
          res.status(500).json({ 
                message: 'There was an error when fetching cards' 
          });
         }
    }
}

