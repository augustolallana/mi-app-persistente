const helmet = require("helmet")
const express = require("express")

function global4ServerMiddlewaresSetup(server) {
    server.use(helmet())
    server.use(express.json())
}

module.exports = {
    global4ServerMiddlewaresSetup
}