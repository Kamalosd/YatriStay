
const express=require("express")
const router=express.Router()
const {listingSchema}=require("../schema.js")
const Listing = require("../models/listing.js")


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


//index route
router.get("/",async(req,res)=>{
  
   const allListings=await  Listing.find({})
   res.render("listings/index",{allListings})
})


//new Route
router.get("/new",(req,res)=>{
  
   res.render("listings/new")
})


//show route
router.get("/:id",async(req,res)=>{
  
    let {id}=req.params
    const listing=await Listing.findById(id).populate("reviews")//id r basis a find krbo listin r data,ota pass krbo show.ejs a
    if(!listing){
       req.flash("error","Listing you requested for does not exist")    
       res.redirect("/listings")
    }
    res.render("listings/show",{listing})
  
})

//create route
router.post("/",validateListing,async(req,res,next)=>{

    try{
       let result= listingSchema.validate(req.body)//listing schema r modhe je constraint define krechi req.body statisfy krche kina
        console.log(result)
        if(result.error){
            throw new Error(400,error)
        }

       let newListing=new Listing(req.body.listing)//new listinG create hbe taa dia 
   await  newListing.save()
   req.flash("success","New Listing Created")
   res.redirect("/listings")
    }catch(err){
      next(err)
    }
    
  
  
   //all var k obj r key bania dbo.listin obj r price key val pair bene jbe
})

//Edit route.akne edit form k rendr krabo
router.get("/:id/edit",async(req,res)=>{
  
    let {id}=req.params
    const listing=await Listing.findById(id)//id r basis a find krbo listin r data,ota pass krbo show.ejs a
     if(!listing){
       req.flash("error","Listing you requested for does not exist")    
       res.redirect("/listings")
    }
       
    res.render("listings/edit",{listing})
  
})

//Update Route
router.put("/:id",validateListing,async(req,res)=>{
  
    let {id}=req.params
    const listing=await Listing.findByIdAndUpdate(id,{...req.body.listing})//...req.body.listing ata js r obj jar modhe sob paarmetr ache
       req.flash("success"," Listing Updated")
    res.redirect("/listings")
  
})

//Delete Route
router.delete("/:id",async(req,res)=>{
  
    let {id}=req.params
    const deletedListing=await Listing.findByIdAndDelete(id)//...req.body.listing ata js r obj jar modhe sob paarmetr ache
    console.log(deletedListing)
   req.flash("success"," Listing Deleted")
    res.redirect("/listings")
  
})

module.exports=router