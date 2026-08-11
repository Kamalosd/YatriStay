const user=require("../models/user")

module.exports.renderSignupForm=(req,res)=>{
  res.render("users/signup.ejs")
}

module.exports.signup=async (req,res,next)=>{
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
  }


  module.exports.renderLoginForm=(req,res)=>{
  res.render("users/login.ejs")
}

module.exports.Login=async (req,res)=>{

  req.flash("success","welcome back to Yatrisathi")
  let redirectUrl=res.locals.redirectUrl || "/listings"
  res.redirect(redirectUrl)

  }


module.exports.Logout=(req,res,next)=>{
    req.logout((err)=>{
      if(err){
       return next(err)
      }
      req.flash("success","You are logged out!")
      res.redirect("/listings")
    })
  }