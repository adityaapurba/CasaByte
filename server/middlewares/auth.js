import jwt from "jsonwebtoken";

export const requireSignin = (req, res, next) =>{
    try{
        // console.log(req.headers);
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error : "Invalid or expired token"});
    }
};