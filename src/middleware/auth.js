const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken(token) {
    return new Promise(function (resolve, reject) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, user) {
        if (err) return reject(err)
        return resolve(user)
    })
})
}

async function authenticate(req, reply, next) {
    // If we have received the bearer token in the header
    const bearerToken = req.headers.authorization
  
    // if not we will throw an error
    if (!bearerToken || !bearerToken.startsWith('Bearer '))
      reply.status(400).send({ message: 'Please provide a bearer token' })
  
    // else we will extract the user from the token
    const token = bearerToken.split(' ')[1]
  
    try {
      const { client } = await verifyToken(token)
  
      // else we will attach the user to the req
      req.user = client
  
      // return next
      return next()
    } catch (err) {
      reply.status(400).send({ message: 'Please provide a valid bearer token' })
    }
  }
  
module.exports = authenticate
