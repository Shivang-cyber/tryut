//const { v4: uuidv4 } = require('uuid')
const { Product } = require('../routes/Product.model')
const { Comment } = require('../routes/comment.model')

const getAllProduct = async (req, reply) => {
  const product = await Product.find().lean().exec()
  const comment = await Comment.find()
    .populate('author', 'mail details.name')
    .lean()
    .exec()
  product.map((a) => {
    let c = comment.filter((b) => b.product.toString() == a._id.toString())
    a.reviews = c
  })
  reply.send({ product })
}

const updateProducts = async (req, reply) => {
  const products = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .lean()
    .exec()
  reply.send({ products })
}

const getProdz = async (req, reply) => {
  let a = req.query.type.split('').slice(0,1).join('')
  let b = req.query.type.split('').slice(1,req.query.type.length).join('')
  const product = await Product.find({type:{$all:a+' '+b}}).lean().exec()
  // console.log(product);
  reply.view('/src/view/cat.ejs', { text: product,sr:req.query.type })

}

const getProducts = async (req, reply) => {
  let a = req.query.type.split('').slice(0,1).join('')
  let b = req.query.type.split('').slice(1,req.query.type.length).join('')
  const aproduct = await Product.find({type:{$all:a+' '+b}}).lean().exec()

  const product = await Product.findById(req.query.id).lean().exec()
  reply.view('/src/view/pro.ejs', { text: product,sr:req.query.type,addon:aproduct })
}
const addProducts = async (req, reply) => {
  const product = await Product.create(req.body)
  reply.send({ product })
}

module.exports = { getProducts, addProducts, getAllProduct, updateProducts,getProdz }
