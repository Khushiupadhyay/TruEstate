import express from 'express';
import { getSales, getFilters } from '../controllers/sales.controller.js';

const router = express.Router();

router.get('/', getSales);
router.get('/filters', getFilters);

export default router;

