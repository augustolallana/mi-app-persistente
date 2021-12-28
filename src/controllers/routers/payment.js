const { Router } = require("express")
const { createPaymentMethodsMiddlewares } = require("../middlewares/payment")
const statusCode = require("../status")

function paymentMethodsRouterSetup (models) {
    const router = Router()

    const {
        createPM,
        modifyPM,
        deletePM
    } = createPaymentMethodsMiddlewares(models)

    router.get("/", async (req, res) => {
        const pms = await models.PaymentMethods.find()
        res.status(statusCode.OK).json(pms)
    })
    
    router.post("/", createPM, (req, res) => {
        res.status(statusCode.OK).json({ message: "Payment method created successfully" })
    })

    router.put("/:name", modifyPM, (req, res) => {
        res.status(statusCode.OK).json({ message: "Payment method updated successfully" })
    })

    router.delete("/:name", deletePM, (req, res) => {
        res.status(statusCode.OK).json({ message: "Payment method deleted successfully" })
    })

    return router
}

module.exports = {
    paymentMethodsRouterSetup
}
