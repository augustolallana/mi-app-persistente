const { Router } = require("express")
const { createUserMiddlewares } = require("../middlewares/users")
const statusCode = require("../status")

function usersRouterSetup (models) {
    const router = Router()
    
    const {
        checkSignupData,
        loadUserToDatabase,
        encryptPassword
    } = createUserMiddlewares(models)

    router.get("/", async (req, res) => {
        const users =  await models.Users.find()
        res.status(statusCode.OK).json(users)
    })
    
    router.post("/", checkSignupData, loadUserToDatabase, encryptPassword, (req, res) => {
        res.status(statusCode.CREATED).json({ message: "User created succesfully" })
    })
    
    return router
}

module.exports = {
    usersRouterSetup
}