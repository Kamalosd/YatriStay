if(process.env.NODE_ENV !="production"){
    require("dotenv").config()
}
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const PORT = process.env.PORT || 3000;
const path=require("path")
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate")
// const cookieParser=require("cookie-parser")
const session = require("express-session")
const MongoStore=require("connect-mongo").default
const flash=require("connect-flash")
const passport=require("passport")
const localstrategy=require("passport-local")
const user=require("./models/user.js")
const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js")
const userRouter=require("./routes/user.js")


const dburl=process.env.ATLASDB_URL

// mongoose.connect('mongodb://127.0.0.1:27017/YatriSathi')
main()
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });
async function main() {
    await mongoose.connect(dburl);
    console.log("MongoDB connected");
}

// app.use(cookieParser("secret ode"))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,"/public")))//static file use r jono


const store=MongoStore.create({
    mongoUrl:dburl,
    crypto:{
      secret:process.env.SECRET,
    },
    touchAfter:24*3600
})

store.on("error",(err)=>{
    console.log("Error in Mongo Session Store",err)
})
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}



app.use(session(sessionOptions))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localstrategy(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    res.locals.currUser=req.user  
    // new var create krlm jeta req.user r infpo store krbe karon directly ejs a req obj k directly use krte prina 
    next()
})


// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new user({
//         email:"std@gmail.com",
//         username:"delta-student"
//     })
//  let registeredUser=  await user.register(fakeUser,"helloworld")
//  res.send(registeredUser)
// })

// app.get('/getsignedcookie',(req,res)=>{ 
//     res.cookie("made-in","india",{signed:true})
//     res.send("signed cookies sent")
// })

// app.get('/getcookies',(req,res)=>{ 
//     res.cookie("great","hello")
//     res.send("send you some cookies")
// })

// app.get('/verify',(req,res)=>{ 
//     console.log(req.signedCookies)
//     res.send("verified")
// })

// app.get('/',(req,res)=>{ 
//     console.dir(req.cookies)
   
// })





app.use("/listings",listingRouter )
app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter)

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
app.use((err, req, res, next) => {
    console.log(err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500).send("Something went wrong");
});

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
