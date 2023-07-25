// BUILD YOUR SERVER HERE

const express = require('express');
const model = require('./users/model');

const server = express();

server.use(express.json());

server.get('/api/users', async(req, res)=>{
    try{
        const users = await model.find();
        res.status(200).json(users)
    } catch(err){
        res.status(500).json({
            message:"The users information could not be retrieved"
        })
    }
});

server.get('/api/users/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const user = await model.findById(id);
        if(!user){
            res.status(404).json({
                message:"The user with the specified ID does not exist"
            })
        }else{
            res.status(200).json(user)
        }

    } catch(err){
        res.status(500).json({
            message:"The user information could not be retrieved"
        })
    }
});

server.post('/api/users', async(req, res)=>{
    try{
        const {name, bio} = req.body;
        if(!name||!bio){
            res.status(400).json({
                message:"Please provide name and bio for the user"
            })
        }else{
            const newUser = await model.insert({name, bio})
            res.status(201).json(newUser)
        }

    }catch(err){
        res.status(500).json({
            message:"There was an error while saving the user to the database"
        })
    }
});

server.put('/api/users/:id', async(req, res) => {
    try{
        const{id} = req.params;
        const{name, bio} = req.body;

        if(!name||!bio){
            res.status(400).json({
                message:"Please provide name and bio for the user"
            })
        }else{
            const updatedUser = await model.update(id,{name,bio})

            if(!updatedUser){
                res.status(404).json({
                    message:"The user with specified ID does not exist"
                })
            }else{
                res.status(200).json(updatedUser)
            }
        }

    }catch(err){
        res.status(500).json({
            message:"The user information could not be modified"
        })
    }
})

server.delete('/api/users/:id', async(req, res)=>{
    try{
        const{id}=req.params;
        const removeUser = await model.remove(id);

        if(!removeUser){
            res.status(404).json({
                message:"The user with the specified ID does not exist"
            })
        }else{
            res.status(200).json(removeUser)
        }

    }catch(err){
        res.status(500).json({
            message:"The user could not be removed"
        })
    }
})



module.exports = server ; // EXPORT YOUR SERVER instead of {}
