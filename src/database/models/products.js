const mongoose = require("mongoose")
const { Schema } = mongoose

const productSchema = {
    name: String,
    price: Number,
    photo: String
}

function createProductModel () {
    const Product = mongoose.model("Product", productSchema)
    return Product
}

module.exports = {
    createProductModel
}