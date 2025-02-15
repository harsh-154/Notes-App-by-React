const jwt=require('jsonwebtoken');
const JWT_SECRET='harshisdon'
const fetchuser=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send("USER NOT FOUND");
    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    }catch(err){
        res.status(401).send("error to fetch user");
    }
}
module.exports=fetchuser;