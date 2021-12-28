const statusCode = require("../status")

function createPaymentMethodsMiddlewares (models) {
    const createPM = async (req, res, next) => {
        const {
            name, 
            code
        } = req.body

        await models.PaymentMethods.create({ name, code })
        next()
    }

    const modifyPM = async (req, res, next) => {
        const { name: PMtoUpdate } = req.params
        const {
            name,
            code
        } = req.body

        const pm = await models.PaymentMethods.findOneAndUpdate({ name: PMtoUpdate }, { name, code })
        if (!pm) {
            res.status(statusCode.NOT_FOUND).json({ message: "Payment method not found" })
            return
        }

        next()
    }

    const deletePM = async (req, res, next) => {
        const { name } = req.params
        
        const pm = await models.PaymentMethods.findOneAndDelete({ name }) 
        if (!pm) {
            res.status(statusCode.NOT_FOUND).json({ message: "Payment method not found" })
            return
        }

        next()
    }

    return {
        createPM,
        modifyPM,
        deletePM
    }
}

module.exports = {
    createPaymentMethodsMiddlewares
}