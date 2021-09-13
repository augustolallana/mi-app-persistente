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
        deleteProduct
    } = createProductsMiddlewares(models)

    router.use(isLogged)

    router.get("/", async (req, res) => {
        const allProducts = await models.Products.find()
        res.json(allProducts)
    })
    
    router.post("/", createProduct, (req, res) => {
        res.status(statusCode.CREATED).json({ message: "Product created successfully" })
    })
    
    router.put("/:name", modifyProduct, (req, res) => {
        res.status(statusCode.OK).json({ message: "Product updated successfully" })
    })
    
    router.delete("/:name", deleteProduct, (req, res) => {
        res.status(statusCode.OK).json({ message: "Product deleted successfully" })
    })

    return router
}

module.exports = {
    productsRouterSetup
}