const mongoose = require('mongoose');

//define chat schema
const personSchema=new mongoose.Schema({

  name:{
    type:String,
    required:true
  },
  aGe:{

  type:Number,
  
  },
  work:{
      type:String,
      enum:['chef','waiter','manager'],
      required:true
  },
  mobile:{
      type:String,
      required:true
  },
    email:{
      type:String,
      required:true,
      unique:true
  },
    address:{
      type:String,
      required:true
  },
    salary:{
      type:Number,
      required:true
  }
}

)
//create person modeld
const person=mongoose.model("person",personSchema)
module.exports=person

 

//body parser akta midleware incominG http req r body k extract kre json data k parse kreobj  bnai ota req.body k dia ndei.app.use dia  use kri middlewaree
// data k require format a dia dei,process hoar aGe data k modify kre dei mne data konformat a asche ota amra dekbo na form data na joson data.ata json data k otai otake obj cob=nvert kre req.body te store kre