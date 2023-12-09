const mongoose = require('mongoose')
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.choi6e7.mongodb.net/?retryWrites=true&w=majority`

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.choi6e7.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log('connected to db'))
.catch((e) => console.log("Error",e))