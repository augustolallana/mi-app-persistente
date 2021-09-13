const { Router } = require("express")
const { createLoginMiddlewares } = require("../middlewares/login")
const statusCode = require("../status")

function loginRouterSetup (models) {
    const router = Router()

    const {
        checkLoginData,
        createToken
    } = createLoginMiddlewares(models)

    router.post("/", checkLoginData, createToken, (req, res) => {
        res.status(statusCode.ACCEPTED).json({ message: `Login succesfully`, token: res.token })
    })

    return router
}

module.exports = {
    loginRouterSetup
}