const { Router } = require("express")

function paymentMethodsRouterSetup (models) {
    const router = Router()

    router.get("/", (req, res) => {
    })
    
    router.post("/", (req, res) => {
    })

    router.put("/:name", (req, res) => {
    })

    router.delete("/:name", (req, res) => {
    })

    return router
}

module.exports = {
    paymentMethodsRouterSetup
}
