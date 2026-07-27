
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const Listing = require("./models/listing")
const PORT=3000
const path=require("path")
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate")
const {listingSchema,reviewSchema}=require("./schema.js")
const Review = require("./models/review.js")
const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js")

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,"/public")))//static file use r jono


app.get('/',(req,res)=>{ 
    res.send("hii i am root")
})

mongoose.connect('mongodb://127.0.0.1:27017/YatriSathi')
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.log(err);
});


const validateListing=(req,res,next)=>{
      let {error}= listingSchema.validate(req.body)
        
        if(error){
            let errMsg=error.details.map((e)=>e.message).join(",")
            throw new Error(400,result.errMsg)
        }
        else{
            next()
        }
}

const validateReview=(req,res,next)=>{
      let {error}= reviewSchema.validate(req.body)
        
        if(error){
            let errMsg=error.details.map((e)=>e.message).join(",")
            throw new Error(400,result.errMsg)
        }
        else{
            next()
        }
}


app.use("/listigs",listings )
app.use("/listings/:id/reviews",reviews)

// app.get('/testListing',async(req,res)=>{ 

//     try{
//    let sampleListin=new listing({
//     title:"my new villa",
//     description:"by the beach",
//     price:6666,
//     location:"Goa",
//     country:"India"

//    })

//    await sampleListin.save()
//    console.log("sample was saved")
//    res.send("successfull testing")

// }catch(err){
//     console.log(err)
//     console.log(err.message)

// }
// })

//404 route
app.use((req, res) => {
    res.status(404).send("404 Not Found");
});

//error handler
app.use((err,req,res,next)=>{
    res.send(" something wrong")
})

app.listen(PORT,()=>{
    console.log(`servr running at http://localhost:${PORT}`)
})
