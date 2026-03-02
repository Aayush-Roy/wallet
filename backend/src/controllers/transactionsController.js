import { sql } from "../config/db.js";

export const getAllTransactions = async(req,res)=>{
    try{
    // const{userId} = req.params;
    const transactions = await sql`(SELECT * FROM transactions)
    ORDER BY created_at DESC
    `
    return res.status(201).json(transactions);
    }catch(err){
        console.log(err);
    }
}


export const getTransactionById = async(req,res)=>{
    try{
    const{userId} = req.params;
    // const user = await sql`(SELECT * FROM transactions WHERE user_id=${userId})
    // ORDER BY created_at DESC
    // `
    const user = await sql`
  SELECT * FROM transactions
  WHERE user_id = ${userId}
  ORDER BY created_at DESC
`;
    return res.status(201).json(user);
    }catch(err){
        console.log(err);
    }
}


export const createTransaction = async(req,res)=>{
    try{
        const {title,amount,category, user_id} = req.body;
        if(!title || !amount || !category || !user_id===undefined){
            return res.status(400).json({message:"All fields are required"})
        }
       const transaction = await sql`INSERT INTO transactions(user_id,title,amount,category)
                    VALUES(${user_id},${title}, ${amount}, ${category})
                    RETURNING *
        `
        console.log(transaction)
        res.status(201).json(transaction[0])
    }catch(err){
        console.log("Error creating the transaction", err);
        res.status(500).json({message:"Internal server error"})
    }
}


export const deleteTransaction = async(req,res)=>{
    try{
        const {id} = req.params;
        const del = await sql`DELETE FROM transactions WHERE id=${id} RETURNING *`
        return res.status(200).json(del);
    }catch(err){
        console.log("Error deleting the transaction", err);
        res.status(500).json({message:"Internal server error"})
    }
}

export const getSummary = async(req,res)=>{
    try{
        const {userId} = req.params;
        const balanceResult = await sql`
        SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${userId}`

        const incomeResult = await sql`
        SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0
        `
        const expensesResult = await sql`
        SELECT COALESCE(SUM(amount),0) as expenses FROM transactions WHERE user_id = ${userId} AND amount < 0
        `

        res.status(200).json({
            balance:balanceResult[0].balance,
            income:incomeResult[0].income,
            expenses:expensesResult[0].expenses,
        })


    }catch(err){
        console.log("Error deleting the transaction", err);
        res.status(500).json({message:"Internal server error"}) 
    }
}