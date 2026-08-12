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
       return res.redirect("/listings")
    }
    console.log(listing)
    res.render("listings/show.ejs",{listing})
  
}


module.exports.createListing=async(req,res,next)=>{
   let url = req.file?.path;
    let filename = req.file?.filename;

    console.log(url, "..", filename);
   

       let newListing=new Listing(req.body.listing)//new listinG create hbe taa dia 
       newListing.owner=req.user._id
       newListing.image={url,filename}
   await  newListing.save()
   req.flash("success","New Listing Created")
   res.redirect("/listings")
    }
   //all var k obj r key bania dbo.listin obj r price key val pair bene jbe





module.exports.renderEditForm=async(req,res)=>{
  
    let {id}=req.params
    const listing=await Listing.findById(id)//id r basis a find krbo listin r data,ota pass krbo show.ejs a
     if(!listing){
       req.flash("error","Listing you requested for does not exist")    
        return res.redirect("/listings")
    }
      let originalImageUrl= listing.image.url
       originalImageUrl =originalImageUrl.replace("/uploads","/uploads/w_200")
    res.render("listings/edit",{listing,originalImageUrl})
  
}



module.exports.updateListing=async(req,res)=>{
  
    let {id}=req.params
  
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing})//...req.body.listing ata js r obj jar modhe sob paarmetr ache

    if(typeof req.file!= "undefined"){//req  afile na exist krle ata undefined hbe
      let url = req.file?.path;
    let filename = req.file?.filename;
     listing.image={url,filename}//new url ,filenam
     await listing.save()
    }
     
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