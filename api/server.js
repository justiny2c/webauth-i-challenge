const express = require('express');

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

// const globalMiddleware = require("./global-middleware.js")
const server = express();



server.use(express.json());

// globalMiddleware(server);

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);


server.get("/", (req, res) => {
    res.json({ api: "Up and running" })
})

module.exports = server