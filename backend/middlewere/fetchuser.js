const JWT=require("jsonwebtoken")
const JWT_SECRET='ABIR#1243'
const fetchuser=(req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"please authenticate a valid token"})
    }
    try{
        const data = JWT.verify(token,JWT_SECRET)
        req.user = data.user
        next()
    }catch(error){
        res.status(401).send({error:"please authenticate a valid token1"})
        console.error(error.message)
    }
}

module.exports=fetchuser