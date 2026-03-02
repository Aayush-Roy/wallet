import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import transactionRoutes from "./routes/transactionsRoutes.js"
dotenv.config({});
const app = express();
app.use(rateLimiter)
app.use(express.json())
app.use((req,res,next)=>{
    console.log("hey we hit an error, the method is", req.method)
    next();
})

const PORT = process.env.PORT



async function initDB(){
    try{
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`

        console.log(`DB initialized successfully`)

    }catch(error){
        console.log("Error init DB", error)
        process.exit(1);
    }
}

app.get("/",(req,res)=>{
    res.send("working...")
})

app.use("/api/transactions", transactionRoutes);




initDB().then(()=>{
app.listen(PORT,()=>{
    console.log(`app listening on ${PORT}`)
})

})


