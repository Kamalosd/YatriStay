
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const PORT=3000
const path=require("path")
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate")
const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js")
// const cookieParser=require("cookie-parser")
const session = require("express-session")
const flash=require("connect-flash")

// app.use(cookieParser("secret ode"))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,"/public")))//static file use r jono

const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}

app.get('/',(req,res)=>{ 
    res.send("hii i am root")
})

app.use(session(sessionOptions))
app.use(flash())

app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    next()
})

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

mongoose.connect('mongodb://127.0.0.1:27017/YatriSathi')
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.log(err);
});




app.use("/listings",listings )
app.use("/listings/:id/reviews",reviews)

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
