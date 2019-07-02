const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PostModel = require('./models/posts')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/node-angular-app', {useNewUrlParser: true})
    .then(()=>{
        console.log('Mongodb Connected')
    })
    .catch(()=>{
        console.log('Failed to connecte db')
    })

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*')
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS")
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended : false } ))

app.post('/api/posts',(req,res)=>{
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content
    });
    post.save()
    console.log(post)
    res.status(201).json({'success':post})
})

app.get('/api/posts',(req,res)=>{
    let posts = [
        {
            "id": "alsjdflajsl",
            "title": "First Post",
            "content": "This is the first post coming from the server"
        },
        {
            "id": "poujcsjlsjd",
            "title": "Second Post",
            "content": "This is the second post coming from the server"
        }
    ]
    PostModel.find()
    .then((result)=>{
        res.json(result)
    })
    .catch(()=>{
        console.log('error in fetch')
    })
})

app.delete("/api/posts/:id",(req,res,next) => {
    console.log(req.params.id)
    PostModel.deleteOne({_id: req.params.id}).then(()=>{
        return res.status(200).json({'success':"Post deleted"})
    })
})

module.exports = app;