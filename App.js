const express  = require('express')
const app  = express();
require("dotenv").config();
const db = require('./Config/database');
const { Router } = require('./Routes/Routes');
const session = require('express-session');
const BlogRouter = require('./Routes/BlogRouter');
const FandomRouter = require('./Routes/FandomRouter');
const mongoDbSession = require('connect-mongodb-session')(session)
const store = new mongoDbSession({
    uri : process.env.MONGO_URI,
    collection : "session"
})

// middleware
app.use(express.json());
app.use(session({
    secret : process.env.SECRET_KEY,
    resave : false,
    saveUninitialized : false,
    store : store,
}))

// routes
app.use('/', Router);
app.use('/blog', BlogRouter)
app.use('/fandom', FandomRouter)

app.listen(process.env.PORT, ()=> {
    console.log('running fine')
})