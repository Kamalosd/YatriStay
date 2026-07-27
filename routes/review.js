
const express=require("express")
const router=express.router()


//Reviews
//post route
router.post("/",validateReview, async(req,res)=>{
  
    let listing=await Listing.findById( req.params.id)
    let newReview=new Review(req.body.review)
    listing.reviews.push(newReview)
    await newReview.save()
    await listing.save()
    
    res.redirect("/listings")
  
})

//Delete review route
router.delete("/:reviewId", async(req,res)=>{
  
    let {id,reviewId}= req.params
    await Review.findById(reviewId)
    
    res.redirect(`/listings/${id}`)
  
})

module.exports=router