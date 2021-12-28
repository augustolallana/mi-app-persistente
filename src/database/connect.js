const mongoose = require("mongoose")
const chalk = require("chalk")
const { createUserModel } = require("./models/users")
const { createProductModel } = require("./models/products")
const { createOrderModel } = require("./models/orders")
const { createPaymentMethodModel } = require("./models/pyament")

function connect () {
    const {
        DB_PORT: port,
        DB_HOST: host,
        DB_NAME: dbname
    } = process.env

    return new Promise((resolve, reject) => {
        mongoose.connect(`mongodb://${host}:${port}/${dbname}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        const db = mongoose.connection
        db.on("error", reject)
        db.once("open", () => {
            console.log(`Database running on ${chalk.cyan(`mongodb://${host}:${port}/${dbname}`)}`)
            const Users = createUserModel()
            const Products = createProductModel()
            const Orders = createOrderModel()
            const PaymentMethods = createPaymentMethodModel()
            resolve({
                Users,
                Products,
                Orders,
                PaymentMethods
            })
        })
    })
}

module.exports = {
    connect
}