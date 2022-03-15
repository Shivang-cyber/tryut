const jwt  = require('jsonwebtoken');
require('dotenv').config()
const {Client} = require('../routes/client.model')

const newTokens = (user)=>{
    return jwt.sign({user},process.env.JWT_SECRET_KEY)
}

const register = async (req,reply) =>{
    let client
    try{
        client = await Client.findOne({mail:req.body.mail})
        if(client) reply.status(400).send({message:'Please check your username and password'})
        client = await Client.create(req.body)
        const token = newTokens(client)
        reply.status(200).send({client,token})
    }catch(err){
        reply.status(500).send({message:"sorry"})
    }
}

const login = async (req,reply)=>{
    try{
        const client = await Client.findOne({mail:req.body.mail})
        if(!client) reply.status(400).send({message:'Please check your username and password'})
        let match = client.checkPassword(req.body.password)
        if(!match) reply.status(400).send({message:'please check your password'})
        const token = newTokens(match)
        reply.status(200).send({client,token})
    }catch(err){
        reply.status(500).send({message:'sorry'})
    }
}
module.exports = { register,login }