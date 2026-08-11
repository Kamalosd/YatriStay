const Listing = require("../models/listing.js")
const { listingSchema } = require("../schema.js")

module.exports.index=async(req,res)=>{
   const allListings=await  Listing.find({})
   res.render("listings/index",{allListings})
}//ar kj sb listin k remdr krano

module.exports.renderNewForm=(req,res)=>{
   res.render("listings/new.ejs")
}

module.exports.showListing=async(req,res)=>{
  
    let {id}=req.params
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner")//id r basis a find krbo listin r data,ota pass krbo show.ejs a
    if(!listing){
       req.flash("error","Listing you requested for does not exist")    
       res.redirect("/listings")
    }
    console.log(listing)
    res.render("listings/show.ejs",{listing})
  
}


module.exports.createListing=async(req,res,next)=>{

    try{
       let result= listingSchema.validate(req.body)//listing schema r modhe je constraint define krechi req.body statisfy krche kina
        console.log(result)
        if(result.error){
             throw new Error(result.error.message);  
        }

       let newListing=new Listing(req.body.listing)//new listinG create hbe taa dia 
       newListing.owner=req.user._id
   await  newListing.save()
   req.flash("success","New Listing Created")
   res.redirect("/listings")
    }catch(err){
      next(err)
    }
   //all var k obj r key bania dbo.listin obj r price key val pair bene jbe
}




module.exports.renderEditForm=async(req,res)=>{
  
    let {id}=req.params
    const listing=await Listing.findById(id)//id r basis a find krbo listin r data,ota pass krbo show.ejs a
     if(!listing){
       req.flash("error","Listing you requested for does not exist")    
       res.redirect("/listings")
    }
       
    res.render("listings/edit",{listing})
  
}



module.exports.updateListing=async(req,res)=>{
  
    let {id}=req.params
  
    await Listing.findByIdAndUpdate(id,{...req.body.listing})//...req.body.listing ata js r obj jar modhe sob paarmetr ache
       req.flash("success"," Listing Updated")
    res.redirect("/listings")
  
}


module.exports.destroyListing=async(req,res)=>{
  
    let {id}=req.params
    const deletedListing=await Listing.findByIdAndDelete(id)//...req.body.listing ata js r obj jar modhe sob paarmetr ache
    console.log(deletedListing)
   req.flash("success"," Listing Deleted")
    res.redirect("/listings")
  
}