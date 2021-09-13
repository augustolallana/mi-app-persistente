const { createHmac } = require("crypto")
const jwt = require("jsonwebtoken")
const statusCode = require("../status")

function createLoginMiddlewares (models) {
    const createToken = async (req, res, next) => {
        const {
            JWT_PRIVATE_KEY: privateKey
        } = global.process.env

        const {
            username,
            email
        } = await models.Users.findOne({ username: req.body.username })
        
        const user = {
            username,
            email
        }

        const token = jwt.sign(user, privateKey)
        res.token = token

        next()
    }
    
    const checkLoginData = async (req, res, next) => {
        const {
            username,
            password
        } = req.body

        const encryptedPassword = createHmac("sha256", password).digest("hex")
        
        const succesfullLogin = await models.Users.findOne({ username, password: encryptedPassword })
        
        if (!succesfullLogin) {
            res.status(statusCode.UNAUTHORIZED).json({ message: "Invalid credentials" })
            return            
        }
        
        next()
    }


    return {
        checkLoginData,
        createToken
    }
}

module.exports = {
    createLoginMiddlewares
}