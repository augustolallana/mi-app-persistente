const mongoose = require("mongoose")
const { Schema } = mongoose

const paymentMethodSchema = {
    name: {
        type: String,
        unique: true
    },
    code: Number
}

function createPaymentMethodModel () {
    const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema)
    return PaymentMethod
}

module.exports = {
    createPaymentMethodModel
}