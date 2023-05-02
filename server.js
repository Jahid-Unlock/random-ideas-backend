
// const path = require('path')
const express = require('express');

require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();

const app = express();

// Static Folder
// app.use(express.static(path.join(__dirname, 'public')));


// Body parser moddleware
app.use(express.json());

app.use(express.urlencoded({extended: false}))


app.get('/', (req, res)=>{
    res.send('Hello World!');
})

const ideasRouter = require('./routes/ideas');
const { json } = require('stream/consumers');
app.use('/api/ideas', ideasRouter)

app.listen(port, ()=> console.log(`server  listening on ${port}`));