import ratelimit from "../config/upstash.js";

export const rateLimiter = async(req,res,next)=>{
    try{
        const {success} = await ratelimit.limit("my-rate-limit");
        if(!success) return res.status(429).json({
            message:"Too may req!"
        })
        next();
    }catch(err){
        console.log("Rate limiter Error",err);
        next(err);
    }
}

