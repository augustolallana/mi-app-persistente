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

    let redisClient = undefined
    const getRedisClient = () => {
        if (!redisClient) {
            redisClient = redis.createClient()
            redisClient.on("error", (error) => {
                console.log(chalk.red("Redis client error", error))
            })
        }
        
        return redisClient
    }

    const storeProductsDataInCache = async (client) => {
        const products = await models.Products.find()
        client.set("products", JSON.stringify(products))
    }

    const useCache = (req, res, next) => {
        const client = getRedisClient()
        const key = "products"
        client.get(key, async (error, data) => {
            if (error) {
                res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong... :(" })
                return
            }
            if (!data) {
                storeProductsDataInCache(client)
                next()
            }
            if (data) {
                res.status(statusCode.OK).send(data)
                return
            }
        })        
    }
    
    const deleteCache = (req, res, next) => {
        const client = getRedisClient()
        const key = "products"
        client.DEL(key)

        next()
    }

    return {
        createProduct,
        modifyProduct,
        deleteProduct,
        useCache,
        deleteCache
    }
}

module.exports = {
    createProductsMiddlewares
}