const fp = require('fastify-plugin')
const path = require('path')
const {
  getProducts,
  addProducts,
  getAllProduct,getProdz,
  updateProducts,
} = require('../controllers/Product.controller')
const {
  getClient,
  addClient,
  getAllClient,
  updateOneClient,
  addToCart,
  purchaseAll,
} = require('../controllers/client.controller')
const {
  getAllComment,
  addComment,
  updateOneComment,
  deleteOneComment,
} = require('../controllers/comment.controller')
const {register,login} = require("../controllers/auth.controller")
const nam = require('../middleware/ran')
const authenticate = require('../middleware/auth')
//RED


module.exports = fp(function productRoutes(fastify, options, done) {

  fastify.get('/', (req, reply) => {console.log(req.user);
      reply.view('/src/view/index.ejs', { text: 'texdat',req:req })})

  fastify.get('/catologue',{preHandler:[nam]},getProdz)
  fastify.get('/prod',getProducts)
  // fastify.get('/pr/:id', getProducts)
  fastify.post('/pr', addProducts)
  fastify.get('/pr/A',{preHandler:[authenticate]}, getAllProduct)
  fastify.patch('/pr/:id', updateProducts)
  //red zone
fastify.post("/register",register)
fastify.post("/login",login)
  //red zone
  fastify.get('/cl/:id', getClient)
  fastify.get('/cl/A', getAllClient)
  fastify.post('/cl',{preHandler:[nam]}, addClient)
  fastify.patch('/cl/:id', updateOneClient)
  fastify.get('/cla/:id', addToCart)
  fastify.get('/pur/:id', purchaseAll)
  fastify.get('/co', getAllComment)
  fastify.post('/co', addComment)
  fastify.patch('/co/:id', updateOneComment)
  fastify.delete('/co/:id', deleteOneComment)
  done()
})
