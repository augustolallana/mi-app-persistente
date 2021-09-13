const { Router } = require("express")

function ordersRouterSetup (models) {
    const router = Router()

    router.get("/", (req, res) => {
    })

    router.get("/estado", (req, res) => { 
    })
    
    router.get("/historial", (req, res) => { 
    })
    
    router.post("/", (req, res) => {
    })
    
    router.post("/confirmar", (req, res) => {
    })
    
    router.put("/", (req, res) => {
    })
    
    router.put("/editar", (req, res) => {
    })

    router.delete("/", (req, res) => {
    })

    return router
}

module.exports = {
    ordersRouterSetup
}