import { Router } from 'express';
import controller from '../controllers/eventosController.js';

const router = Router();

router.post('/', controller.addEvento);
router.get('/', controller.getEventos);
router.get('/:id', controller.getEvento);
router.put('/:id', controller.updateEvento);
router.delete('/:id', controller.deleteEvento);

export default router;
