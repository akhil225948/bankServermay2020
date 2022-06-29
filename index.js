//server creation

// import express

const express = require('express')

//import jsonwebtoken

const jwt = require('jsonwebtoken')

// import cors
const cors=require("cors")
//import dataService 

const dataService = require('./services/data.service')

//server app create using express

const app = express()

//cors use in server app
app.use(cors({
    origin:"http//localhost:4200"
}))

//parse JSON data

app.use(express.json())

//application specific middleware

const appMiddleware = (req, res, next) => {
    console.log("application specific middleware");
    next()
}

//use middleware in app
app.use(appMiddleware)

//Bank server

const jwtMiddleware = (req, res, next) => {
    //fetch token

    try {
        token = req.headers['x-access-token']
        //verify token
        const data = jwt.verify(token, 'supersecretkey12345')
        console.log(data);
        next()
    }
    catch {
        res.status(401).json({
            status: false,
            statusCode: 401,
            message: 'Please Log in'
        })
    }
}

//Register API

app.post('/register', (req, res) => {
    //register solving
    dataService.register(req.body.username, req.body.acno, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)

        })

})

//Login API

app.post('/login', (req, res) => {
    //login solving
     dataService.login(req.body.acno, req.body.password)
     .then(result => {
        res.status(result.statusCode).json(result)

    })

})

//Deposit API

app.post('/deposit', jwtMiddleware, (req, res) => {
    //deposit solving
     dataService.deposit(req.body.acno, req.body.password, req.body.amt)
     .then(result => {
        res.status(result.statusCode).json(result)

    })
})

//Withdraw API

app.post('/withdraw', jwtMiddleware, (req, res) => {
    //deposit solving
    dataService.withdraw(req.body.acno, req.body.password, req.body.amt)
    .then(result => {
        res.status(result.statusCode).json(result)

    })
})

//Transaction API

app.post('/transaction', jwtMiddleware, (req, res) => {
    //transaction solving
    dataService.getTransaction(req.body.acno)
    .then(result => {
        res.status(result.statusCode).json(result)

    })
})

//User request resolving

//GET request - to fetch data

app.get('/', (req, res) => {
    res.send("GET Request")
})

//POST Request - to create data

app.post('/', (req, res) => {
    res.send("POST Request")
})

//PUT Request - to modify entire data

app.put('/', (req, res) => {
    res.send("PUT Request")
})

//PATCH Request - to modify partially

app.patch('/', (req, res) => {
    res.send("PATCH Request")
})

//DELETE Request - to delete data

app.delete('/', (req, res) => {
    res.send("DELETE Request")
})

//set up port number to the server app

app.listen(3000, () => {
    console.log("Server started at 3000");
})