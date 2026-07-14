const mongoose=require('mongoose')
const schema=mongoose.Schema


const listingSchema=new schema(
  {
    title:{
     type: String,
     required:true
    },
    description:String,
    image:{
     type: String,//imG undefine null ki ,2nd img HAI buto rlink empt
     default:"file:///C:/Users/91743/OneDrive/Desktop/Home%20Build%20-%20IMG%20HOTELS.html",
     set:(v)=>v===" "?'file:///C:/Users/91743/OneDrive/Desktop/Home%20Build%20-%20IMG%20HOTELS.html ' :v
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:"Reviews"
      }
    ]
  }
)
const listing=mongoose.model("listing",listingSchema)
module.exports=listing