import express from 'express';
import { Createplastic, deleteplastic, Plasticview } from '../controllers/plastic.controller.js';

const router = express.Router();

router.post('/Createplastic', Createplastic);
router.get('/Plasticview/:email',Plasticview);
router.delete('/deleteplastic/:id',deleteplastic);

export default router;
