const mongooseConnection = require('../config/db')
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')


const clientSchema = mongoose.Schema(
  {mail: { type: String, required: true },
  password: { type: String, required: true, minLength: 8, maxLength: 20 },
    details: {
      name: { type: String, required: true },
      mob: { type: String, required: true },
      address: { type: String, required: true },
    },
    in_cart: [
      {item: {type: mongoose.Schema.Types.ObjectId,ref: 'Product',required: false,},
        count: { type: String, required: true },
      },
    ],
    liked: [{ item: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false,},},],
    purchased: [
      {item: [{item: {type: mongoose.Schema.Types.ObjectId,ref: 'Product',required: false,},},],
        price: { type: String, required: false },
        deliveryDate: { type: String, required: false },
        orderTime: { type: String, required: false },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
clientSchema.pre("save", function(next){
  if(!this.isModified('password')) next()
  const hash = bcryptjs.hashSync(this.password,8)
  this.password = hash
  next()
})

clientSchema.methods.checkPassword = function(password){
const match = bcryptjs.compareSync(password,this.password)
return match
}

const Client = mongooseConnection.model('client', clientSchema)

module.exports = { Client }
