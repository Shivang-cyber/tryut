const mongooseConnection = require('../config/db')
const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  { brand:{type: String,required: true},
    name: { type: String, required: true },
    price: { type: String, required: true },
    images: [{ type: String, required: true }],
    tag: [{ type: String, required: true }],
    type:{type: String, required:true},
    size: [{ type: String, required: true }],
    c: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
const Product = mongooseConnection.model('Product', productSchema)

module.exports = { Product }
