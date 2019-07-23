const express = require('express');

const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session)

module.exports = (server) => {
    const sessionConfig = {
        name: "cookieName", // defaults to sid
        secret: process.env.SESSION_SECRET || "Keep it a secret, keep it a safe!", // to encrept/decrypt the cookie
        cookie: {
            maxAge: 1000 * 60 * 10, // milliseconds -> cookie is good for 10 minutes
            secure: false, // true in production, only send cookie over https (false)
            httpOnly: true, // JS can't access the cookie on the client
        },
        resave: false, // save the session again even if it didn't change
        saveUnintialized: true,
        store: new KnexSessionStore({ 
            // remember to new it up
            knex: require("../data/db-config.js"),
            tablename: "sessions",
            createtable: true,
            sidfieldname: "sid",
            clearInterval: 1000 * 60 * 60 // deletes expired sessions every hour  
        })
    }
    server.use(express.json());
    server.use(session(sessionConfig));
}

