const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Viha_18321:Password@123@cluster0.czebk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });"
const { Blog } = require('./models/Blog')
const { User } = require ('./models/users')
const extAPIcontroller = require('./externalAPI')
const createError = require('http-errors')
mongoose.connect(uri)
const app = express();
app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

// find by date
// use library e.g. luxon for date/time handling - make it more user friendly
// register
app.post('/register', async (req, res, next) => {
    const checkuser = await User.findOne({userName: req.body.userName})
    if(checkuser) {
        (next(createError(409,"user already exists")))
    
    const newUser = req.body
    const user = new User(newUser)
    await user.save()
    res.send({message: "New account registered!"})
}

// login
app.post('/auth', async (req,res) => {    
    const user = await User.findOne({userName: req.body.userName})
    console.log(user) 
    if(!user){
        return res.sendStatus(401)
    }
    if(req.body.password !== user.password){
        return res.sendStatus(403)
    }
    user.token = uuidv4()
    await user.save()
    res.send({token: user.token})
})
// authorisation using token to save login state
app.use(async (req,res,next) => {
    const authHeader = req.headers['authorization']
    const user = await User.findOne({token: authHeader})
    if(user){
        next()
    } else {
        res.sendStatus(403)
    }
})
app.post('/', async (req,res) => {
    const newBlog = req.body
    
    const Blog= new Blog(newBlog)
    await Blog.save()
    res.send({ message: 'New Blog posted.'})
}) 
app.delete('/:id', async (req,res) => {
    await Blog.deleteOne({_id: ObjectId(req.params.id)})
    res.send({message: 'Blog deleted.'})
})

app.delete('/deleteall/:confirm', async (req,res) => {
    if (req.params.confirm !== "yes") {
        return res.send({message: `Are you sure you want to delete? Replace ${req.params.confirm} with yes`})
    }
    await Blog.deleteMany()
    res.send({message: 'All Blogs Deleted.'})

})

app.put('/:id', async (req,res) => {
    awaitBlog.findOneAndUpdate({_id: ObjectId(req.params.id)}, req.body)
    res.send({ message: 'Blog updated.'})
    const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Viha_18321:Password@123@cluster0.czebk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const { Blog } = require('./models/events')
const { User } = require ('./models/users')
//const extAPIcontroller = require('./externalAPI')
const createError = require('http-errors')
mongoose.connect(uri)
const app = express();
app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))
 
app.post('/register', async (req, res, next) => {
    const checkuser = await User.findOne({userName: req.body.userName})
    if(checkuser) {
        (next(createError(409,"user already exists")))
    }
    const newUser = req.body
    const user = new User(newUser)
    await user.save()
    res.send({message: "New account registered!"})
})
// login
app.post('/auth', async (req,res) => {    
    const user = await User.findOne({userName: req.body.userName})
    console.log(user) 
    if(!user){
        return res.sendStatus(401)
    }
    if(req.body.password !== user.password){
        return res.sendStatus(403)
    }
    user.token = uuidv4()
    await user.save()
    res.send({token: user.token})
})
// authorisation using token to save login state
app.use(async (req,res,next) => {
    const authHeader = req.headers['authorization']
    const user = await User.findOne({token: authHeader})
    if(user){
        next()
    } else {
        res.sendStatus(403)
    }
})
app.post('/', async (req,res) => {
    const newBlog = req.body
    
    const Blog = newBlog(newBlog)
    await Blog.save()
    res.send({ message: 'New Blog posted.'})
}) 
app.delete('/:id', async (req,res) => {
    await Blog.deleteOne({_id: ObjectId(req.params.id)})
    res.send({message: 'Blog deleted.'})
})

app.delete('/deleteall/:confirm', async (req,res) => {
    if (req.params.confirm !== "yes") {
        return res.send({message: `Are you sure you want to delete? Replace ${req.params.confirm} with yes`})
    }
    awaitBlog.deleteMany()
    res.send({message: 'All Blogs Deleted.'})

})

app.put('/:id', async (req,res) => {
    await Blog.findOneAndUpdate({_id: ObjectId(req.params.id)}, req.body)
    res.send({ message: 'Blogs updated.'})
}
)