const jwt = require("jsonwebtoken")
const statusCode = require("../status")

function global4RouterMiddlewaresSetup (models) {
    const isLogged = (req, res, next) => {
        const {
            JWT_PRIVATE_KEY: privateKey
        } = global.process.env
        
        const token = req.headers.authorization

        try {
            jwt.verify(token, privateKey)
        } catch (error) {
            res.status(statusCode.UNAUTHORIZED).json({ message: "Not authorized! Try logging in." })
            return
        }
                
        next()
    }

    const isAdmin = (req, res, next) => {
    }
    
    return {
        isLogged,
        isAdmin
    }
}

module.exports = {
    global4RouterMiddlewaresSetup
}