
const express=require("express")
const router=express.router()

//index route
router.get("/listings",async(req,res)=>{
  
   const allListings=await  Listing.find({})
   res.render("listings/index",{allListings})
})


//new Route
router.get("/listings/new",(req,res)=>{
  
   res.render("listings/new")
})


//show route
router.get("/listings/:id",async(req,res)=>{
  
    let {id}=req.params
    const listing=await Listing.findById(id).populate("reviews")//id r basis a find krbo listin r data,ota pass krbo show.ejs a
    res.render("listings/show",{listing})
  
})

//create route
router.post("/listings",validateListing,async(req,res,next)=>{

    try{
       let result= listingSchema.validate(req.body)//listing schema r modhe je constraint define krechi req.body statisfy krche kina
        console.log(result)
        if(result.error){
            throw new Error(400,error)
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
router.get("/listings/:id/edit",async(req,res)=>{
  
    let {id}=req.params
    const listing=await Listing.findById(id)//id r basis a find krbo listin r data,ota pass krbo show.ejs a
    res.render("listings/edit",{listing})
  
})

//Update Route
router.put("/listings/:id",validateListing,async(req,res)=>{
  
    let {id}=req.params
    const listing=await Listing.findByIdAndUpdate(id,{...req.body.listing})//...req.body.listing ata js r obj jar modhe sob paarmetr ache
    res.redirect("/listings")
  
})

//Delete Route
router.delete("/listings/:id",async(req,res)=>{
  
    let {id}=req.params
    const deletedListing=await Listing.findByIdAndDelete(id)//...req.body.listing ata js r obj jar modhe sob paarmetr ache
    console.log(deletedListing)

    res.redirect("/listings")
  
})

module.exports=router