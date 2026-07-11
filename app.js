
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const Listing = require("./models/listing")
const PORT=3000
const path=require("path")//ejs k req krara jono path setup
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate")//ata template creatr or layout creat a help kre style r jonno use hoi,common template like navbar sob ejs pG athke
const {listingSchema}=require("./schema.js")

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


//listinG a all return villa 
app.get("/listings",async(req,res)=>{
  
   const allListings=await  Listing.find({})
   res.render("listings/index",{allListings})
})


//new Route
app.get("/listings/new",(req,res)=>{
  
   res.render("listings/new")
})


//show route
app.get("/listings/:id",async(req,res)=>{
  
    let {id}=req.params
    const listing=await Listing.findById(id)//id r basis a find krbo listin r data,ota pass krbo show.ejs a
    res.render("listings/show",{listing})
  
})

//create route
app.post("/listings",async(req,res,next)=>{

    try{
       let result= listingSchema.validate(req.body)//listing schema r modhe je constraint define krechi req.body statisfy krche kina
        console.log(result)
        if(result.error){
            throw new Error(400,result.error)
        }

       let newListing=new Listing(req.body.listing)//new listinG create hbe taa dia 
   await  newListing.save()
   res.redirect("/listings")
    }catch(err){
      next(err)
    }
    
  
  
   //all var k obj r key bania dbo.listin obj r price key val pair bene jbe
})

//Edit route.akne edit form k rendr krabo
app.get("/listings/:id/edit",async(req,res)=>{
  
    let {id}=req.params
    const listing=await Listing.findById(id)//id r basis a find krbo listin r data,ota pass krbo show.ejs a
    res.render("listings/edit",{listing})
  
})

//Update Route
app.put("/listings/:id",async(req,res)=>{
  
    let {id}=req.params
    const listing=await Listing.findByIdAndUpdate(id,{...req.body.listing})//...req.body.listing ata js r obj jar modhe sob paarmetr ache
    res.redirect("/listings")
  
})

//Delete Route
app.delete("/listings/:id",async(req,res)=>{
  
    let {id}=req.params
    const deletedListing=await Listing.findByIdAndDelete(id)//...req.body.listing ata js r obj jar modhe sob paarmetr ache
    console.log(deletedListing)

    res.redirect("/listings")
  
})


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
