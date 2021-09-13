require("dotenv").config()
const express = require("express")
const chalk = require("chalk")
const { serverSetup } = require("./controllers/serverSetup");
const { connect } = require("./database/connect");

async function main () {
    const server = express()
    const PORT = process.env.PORT

    const models = await connect()
    serverSetup(server, models)
    
    server.listen(PORT, () => {
        console.log(`Server running on port ${chalk.cyan(PORT)}`)
    })
}

main()