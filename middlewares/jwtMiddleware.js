const jwt = require('jsonwebtoken');

const jwtMiddleware = (req,res,next)=>{
    console.log("inside jwt Middleware");
    const token = req.headers['authorization'].split(' ')[1];
    console.log("token",token);

    try{
        const jwtResponse = jwt.verify(token,"supersecretkey");
        req.payload = jwtResponse.userId;
        next();
    }
    catch(err){
        res.status(401).json("something went wrong");
    }    
}

module.exports = jwtMiddleware;