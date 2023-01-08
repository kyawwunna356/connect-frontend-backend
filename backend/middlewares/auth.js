const jwt = require('jsonwebtoken')

const tokenCheck = async (req,res,next) => {
    try {
        const { authorization } = req.headers

        if(!authorization.startsWith('Bearer ')) res.status(400).json({message: "Invalid Token"})
        const token = authorization.split(' ')[1]
        if (!token) res.status(400).json({message: "You are not authorized"})

        const id = jwt.verify(token,process.env.SECRET_KEY)
        req.user = id
        next()
        } catch (err) {
        res.status(400).json({message: err.message})
    }
}


module.exports = {tokenCheck}