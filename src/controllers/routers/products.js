const { Router } = require("express")
const { global4RouterMiddlewaresSetup } = require("../middlewares/globals4routers")
const { createProductsMiddlewares } = require("../middlewares/products")
const statusCode = require("../status")

function productsRouterSetup (models) {
    const router = Router()
    
    const {
        isLogged
    } = global4RouterMiddlewaresSetup(models)

    const {
        createProduct,
        modifyProduct,
        deleteProduct,
        useCache,
        deleteCache
    } = createProductsMiddlewares(models)

    router.use(isLogged)

    router.get("/", useCache, async (req, res) => {
        const products = await models.Products.find()
        res.status(statusCode.OK).json(products)
    })
    
    router.post("/", createProduct, deleteCache, (req, res) => {
        res.status(statusCode.CREATED).json({ message: "Product created successfully" })
    })
    
    router.put("/:name", modifyProduct, deleteCache, (req, res) => {
        res.status(statusCode.OK).json({ message: "Product updated successfully" })
    })
    
    router.delete("/:name", deleteProduct, deleteCache, (req, res) => {
        res.status(statusCode.OK).json({ message: "Product deleted successfully" })
    })

    return router
}

module.exports = {
    productsRouterSetup
}