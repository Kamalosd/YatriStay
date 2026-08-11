
const express=require("express")
const router=express.Router()
const Listing = require("../models/listing.js")
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js")
const { populate } = require("../models/user.js")
const listingController = require("../controllers/listings.js")
const multer=require('multer')
const {storage}=require("../cloudConfig.js")
const upload=multer({storage})

//index route.create route 
router.
route("/")
.get(listingController.index)
// . post  (isLoggedIn,validateListing,listingController.createListing)


.post(upload.single('listing[image]'),(req,res)=>{
  res.send(req.file)
})

//new Route
router.get("/new",isLoggedIn,listingController.renderNewForm)




//show route   //Update Route  //Delete Route
router.
route("/:id")
.get(listingController.showListing)

.put(validateListing,isLoggedIn,isOwner,listingController.updateListing)

.delete(isLoggedIn,isOwner,listingController.destroyListing)




//Edit route.akne edit form k rendr krabo
router.get("/:id/edit",isLoggedIn,isOwner,listingController.renderEditForm)



module.exports=router