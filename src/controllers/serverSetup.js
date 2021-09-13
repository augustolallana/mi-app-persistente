const { global4ServerMiddlewaresSetup } = require("./middlewares/globals4server");
const { usersRouterSetup } = require("./routers/users");
const { productsRouterSetup } = require("./routers/products");
const { ordersRouterSetup } = require("./routers/orders");
const { paymentMethodsRouterSetup } = require("./routers/payment");
const { loginRouterSetup } = require("./routers/login");

function serverSetup (server, models) {
    global4ServerMiddlewaresSetup(server)
    server.use("/users", usersRouterSetup(models))
    server.use("/products", productsRouterSetup(models))
    server.use("/orders", ordersRouterSetup(models))
    server.use("/payment-methods", paymentMethodsRouterSetup(models))
    server.use("/login", loginRouterSetup(models))
}

module.exports = {
    serverSetup
}