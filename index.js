const PORT = process.env.PORT || 3006
require('dotenv').config()
const fastify = require('fastify')({ logger: true })
// const cors = require("cors")
// const path = require('path')

fastify.register(require('fastify-cors'), {  origin: '*',  methods: ['POST','GET']})

fastify.register(require('point-of-view'), {  engine: {  ejs: require('ejs')}})


const fastifyPassport = require('fastify-passport')
const fastifySecureSession = require('fastify-secure-session')
const fs = require('fs')
const path = require('path')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const dotenv = require('dotenv')
dotenv.config()

fastify.register(fastifySecureSession, {
  key: fs.readFileSync(path.join(__dirname,'not-so-secret-key')),
  cookie: {
      path: '/'
  }
})

fastify.register(fastifyPassport.initialize())
fastify.register(fastifyPassport.secureSession())

fastifyPassport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, function (accessToken,refreshToken,profile,cb) {
    cb(undefined, profile)
}
))

fastifyPassport.registerUserDeserializer(async(user,req) => {
    return user
})

fastifyPassport.registerUserSerializer(async(user,req) => {
    return user
})

fastify.get('/auth/google/callback',
    {preValidation: fastifyPassport.authenticate('google',{scope:['email','profile']})},
    async (req,res) => {
        res.redirect('/')
    }
)

fastify.get('/login',   {preValidation: fastifyPassport.authenticate('google',{scope:['email','profile']})},async (req,res) => {
  res.redirect('/')
})

fastify.get('/logout',
    async(req,res) => {
        req.logout()
  res.redirect('/')

        return {success:true}
    }
)




fastify.register(require('fastify-static'), {  root: path.join(__dirname, 'src'),  wildcard: false})
fastify.register(require('./src/Router/router'))

fastify.listen(PORT, '0.0.0.0', (err) => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
