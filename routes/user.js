const express=require("express")
const router=express.Router()
const user=require("../models/user.js")
const passport=require("passport")
const { saveRedirectUrl } = require("../middleware.js")

router.get("/signup",(req,res)=>{
  res.render("users/signup.ejs")
})

router.post("/signup",async (req,res,next)=>{

  try{

   let {username,email,password}=req.body
  const newUser=new user({email,username})
  const registeredUser=await user.register(newUser,password)
  console.log(registeredUser)
  req.login(registeredUser,(err)=>{
      if(err){
       return next(err)
      }
      req.flash("success","welcome to Yatrisathi")
  res.redirect("/listings")
       })


     } catch(e){
    req.flash("error",e.message)
        res.redirect("/signup");
  }
  });

  router.get("/login",(req,res)=>{
  res.render("users/login.ejs")
})

router.post("/login",saveRedirectUrl, passport.authenticate("local",{failureRedirect:'/login',failureFlash:true
}), async (req,res)=>{

  req.flash("success","welcome back to Yatrisathi")
  res.redirect(req.locals.redirectUrl)

  });

  router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
      if(err){
       return next(err)
      }
      req.flash("success","You are logged out!")
      res.redirect("/listings")
    })
  })

module.exports=router;