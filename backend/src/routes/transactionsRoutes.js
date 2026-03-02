import { Router } from "express";
import { sql } from "../config/db.js";
import { createTransaction, deleteTransaction, getAllTransactions, getSummary, getTransactionById } from "../controllers/transactionsController.js";
const router = Router();



router.get("/all",getAllTransactions)


router.get("/:userId",getTransactionById)

router.post('/',createTransaction)

router.delete('/:id',deleteTransaction)

router.get("/summary/:userId",getSummary)

export default router;