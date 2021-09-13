const { createHmac } = require("crypto")
const statusCode = require("../status")

function createUserMiddlewares (models) {
    const checkSignupData = async (req, res, next) => {
        const {
            username,
            email,
            password
        } = req.body

        if (!username || !email || !password) {
            res.status(statusCode.BAD_REQUEST).json({ message: "Important information is missing to complete signup, check again!" })
            return
        }

        const promises = [models.Users.findOne({ username }), models.Users.findOne({ email })]
        const [userAlreadyExists, emailAlreadyExists] = await Promise.all(promises)
        
        if (userAlreadyExists) {
            res.status(statusCode.FORBIDEN).json({ message: "Username already registered" })
            return
        }

        if (emailAlreadyExists) {
            res.status(statusCode.FORBIDEN).json({ message: "Email already registered" })
            return
        }

        next()
    }
    
    const loadUserToDatabase = async (req, res, next) => {
        const { 
            username, 
            completeName, 
            email, 
            celphoneNumber, 
            addresses 
        } = req.body
        
        const newUser = await models.Users.create({ username, completeName, email, celphoneNumber, addresses, password: "temporary" })
        newUser.save()

        next()
    }

    const encryptPassword = async (req, res, next) => {
        const { 
            username,
            password 
        } = req.body
        const encryptedPassword = createHmac("sha256", password).digest("hex")

        await models.Users.findOneAndUpdate({ username }, { password: encryptedPassword })
        
        next()
    }

    return {
        checkSignupData,
        loadUserToDatabase,
        encryptPassword
    }
}

module.exports = {
    createUserMiddlewares
}