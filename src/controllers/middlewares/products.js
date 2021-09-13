const chalk = require("chalk")
const redis = require("redis")
const statusCode = require("../status")

function createProductsMiddlewares (models) {
    const createProduct = async (req, res, next) => {
        const {
            name,
            price,
            photo
        } = req.body
        
        await models.Products.create({name, price, photo})

        next()
    }

    const modifyProduct = async (req, res, next) => {
        const { name: productToUpdate } = req.params
        const {
            name,
            price,
            photo
        } = req.body

        const product = await models.Products.findOneAndUpdate({ name: productToUpdate }, {name, price, photo})
        if (!product) {
            res.status(statusCode.NOT_FOUND).json({ message: "Product not found" })
            return
        }

        next()
    }

    const deleteProduct = async (req, res, next) => {
        const { name } = req.params

        const product = await models.Products.findOneAndDelete({ name })

        if (!product) {
            res.status(statusCode.NOT_FOUND).json({ message: "Product not found" })
            return
        }

        next()
    }

    let client = undefined
    const getRedisClient =() => {
        if (!client) {
            client = redis.createClient()
        }
    }
    
    return {
        createProduct,
        modifyProduct,
        deleteProduct
    }
}

module.exports = {
    createProductsMiddlewares
}