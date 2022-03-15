const Fastify = require('fastify')


function nam(req, reply, next) {
  // res.setHeader('x-custom', true)
  // res.setHeader('x-custo', 'bruh')
  console.log(req.query.type,req.body);
  // res.body = req.query.med
//   console.log(res);
  next()
}

module.exports = nam