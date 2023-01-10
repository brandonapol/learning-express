const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./src/db')

dotenv.config()

const app = express();
connectDB();

app.get("/", (req, res) => {
    console.log('hello, world')
})

app.listen(process.env.PORT, () => {
    console.log(`Process has started on port ${process.env.PORT}`)
})