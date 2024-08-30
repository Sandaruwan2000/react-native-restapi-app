import express from 'express';
import { Addcart, deletecart, getAllcarts } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/addcart', Addcart);
router.get('/getAllcarts',getAllcarts);
// router.get('/onecart/:id',onecart);
router.delete('/deletecart/:id',deletecart);

export default router;
