import express from 'express';
import { sendQuoteRequest } from '../controllers/quote.controller.js';

const router = express.Router();

// POST /api/contact
router.post('/', sendQuoteRequest);

export default router;