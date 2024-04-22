import { Request, RequestHandler, Response } from 'express';
import * as CardDao from './cards.dao';
import { OkPacket } from 'mysql';
import { Card } from './cards.model';


export const readCards: RequestHandler = async (req: Request, res: Response) => {
    try {
        let cards;
        let cardId = parseInt(req.query.cardId as string);

        if (Number.isNaN(cardId)) {
            console.log('cardId', cardId);
            cards = await CardDao.readCards();
        } else {
            cards = await CardDao.readCardsByCardId(cardId);
        }
        res.status(200).json(cards);
    } catch (error) {
        console.error('[decks.controller][readCards][Error] ', error);
        console.error("[decks.controller] [deleteCard] [Error] ", error);
        return res.status(500).json({ message: 'There was an error when deleting cards' });
    }
};


export const readCardsByDeckId: RequestHandler = async (req: Request, res: Response) => {
    try {
        const deckId = parseInt(req.params.deckId);
        const cards = await CardDao.readCardsByDeckId(deckId);
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const readCardByCardId: RequestHandler = async (req: Request, res: Response) => {
    try {
        const cardId = parseInt(req.params.cardId);
        const card = await CardDao.readCardsByCardId(cardId);
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const readCardsByQuestionSearch: RequestHandler = async (req: Request, res: Response) => {
    try {
        const cards = await CardDao.readCardsByQuestionSearch('%' + req.params.search + '%');
        res.status(200).json(cards);
    } catch (error) {
        console.error('[cards.controller][readCardsByQuestionSearch][Error] ', error);
        res.status(500).json({ message: 'There was an error when fetching cards' });
    }
};

// --------------------------------------------------------
export const createCard: RequestHandler = async (req: Request, res: Response) => {
    try {
        const card: Card = req.body;
        const index: number = req.body.index;
        const deckId: number = req.body.deckId;
        const response = await CardDao.createCard(card, index, deckId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateCard: RequestHandler = async (req: Request, res: Response) => {
    try {
        const card: Card = req.body;
        await CardDao.updateCard(card);
        res.status(200).json({ message: 'Card updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// --------------------------------------------------------


export const deleteCard: RequestHandler = async (req: Request, res: Response) => {
    try {
        let cardId = parseInt(req.params.cardId as string);
        
        if (!Number.isNaN(cardId)) {
            const response = await CardDao.deleteCard(cardId);
            
            return res.status(200).json(response); 
        } else {
            throw new Error("Integer expected for cardId");
        }
        
    } catch (error) {
        console.error('[cards.controller][deleteCard][Error] ', error);
        res.status(500).json({ message: 'There was an error when deleting the card!' });
    }
};
