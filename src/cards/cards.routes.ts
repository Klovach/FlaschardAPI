import { Router } from 'express';
import * as CardsController from './cards.controller';

const router = Router();

router.route('/cards').get(CardsController.readCards); 
router.route('/cards/:cardId').get(CardsController.readCardByCardId); 
router.route('/decks/:deckId/cards').post(CardsController.createCard);
router.route('/cards').put(CardsController.updateCard); 
router.route('/cards/search/question/:search').get(CardsController.readCardsByQuestionSearch);
router.route('/cards/:cardId').delete(CardsController.deleteCard); 

export default router;