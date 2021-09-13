const mongoose = require("mongoose")
const { Schema } = mongoose

const paymentSchema = {
    name: String,
    code: Number
}

const orderSchema = {
    products: [{
        type: Schema.Types.ObjectId, ref: "Productos"
    }],
    precio: Number,
    user: {
        type: Schema.Types.ObjectId, ref: "Usuarios"
    },
    paymentMethod: [paymentSchema],
    address: String
}

function createOrderModel () {
    const Order = mongoose.model("Order", orderSchema)
    return Order
}

module.exports = {
    createOrderModel
}