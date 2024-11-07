import { Router } from 'express';
import controller from '../controllers/convidadosController.js';

const router = Router();

router.post('/:idEventos/convidados', controller.addConvidado);
router.get('/:idEventos/convidados', controller.getConvidados);
router.delete('/:idEventos/convidados/:id', controller.deleteConvidado);

export default router;
