const mongoose = require('mongoose');

//define chat schema
const MenuItemSchema=new mongoose.Schema({

  name:{
    type:String,
    required:true
  },
  price:{

  type:Number,
  required:true
  },
  taste:{
    type:String,
    enum:['sweet','spicy','sour'],
      required:true

  },
  is_drink:{
    type:Boolean,
    default:false//client na vejle automatic falsesv kre
  },
  ingredients:{
    type:[String],//bec akne arry of strin store hbe,jodi ana veje empty deault
      default:[]

  },
  no_of_sales:{
    type:Number,
      default:0//entrytime a no of sale 0
  }
})
  const MenuItem=mongoose.model("MenuItem",MenuItemSchema)
  module.exports=MenuItem