import { Router } from 'express';
import * as DecksController from './decks.controller';

const router = Router();

// ?flaschardId=1
router.route('/decks').get(DecksController.readDecks); 
router.route('/decks').post(DecksController.createDeck); 
router.route('/decks').put(DecksController.updateDeck); 
router.route('/decks/search/name/:search').get(DecksController.readDecksByNameSearch);
router.route('/decks/:deckId').delete(DecksController.deleteDeck); 

export default router;