// const express=require('express')
// const app=express()//express r instance ta app var r modhe

// const middleware=(req,res,next)=>{
//     console.log("middleware func")
// next()
// }

// app.get("/",middleware,(req,res)=>{
//     res.send("i am a Get request at home route")
// })

// //sobr jono akta comon midlewar use krbo ,tokon midlewre ta kete dbo uporer.home routr r madome se midleware a chole jche
// app.use(middleware)

// //jodi valid kono url na pai ata dekabe akne kono route di ni err hndlin middleware 
// app.use((req,res,next)=>{
//     res.send("404 not dound")
// })
// app.get("/Contact",(req,res)=>{
//     res.send("i am a Get request at contact route")
// })




// const express=require('express')
// const app=express()//express r instance ta app var r modhe
// const port=2100


// // vul path dileo middleware kj krbe op asbe
//  app.use((req,res,next)=>{
//     console.log("i am 1st middleware")
//     next()//nxt is end of midleware
// })

//  app.use((req,res,next)=>{
//     console.log("i am 2ndt middleware")
//     next()
// })

// //utility middleware
//  app.use((req,res,next)=>{
//     req.time=Date.now()
//     console.log(req.method, req.time)
//     next()//nxt is end of midleware
// })

// app.get("/",(req,res)=>{
//     res.send("i am a  route")
// })


// app.get("/Contact",(req,res)=>{
//     res.send("i am a Get request at contact route")
// })


//  app.use((req,res,)=>{
//     console.log("404")
  
// })
//  app.listen(port,()=>{
//     console.log(`servr is runnin at http://localhost:${port}`)
// })




//take ip
// const prompt = require("prompt-sync")();

// let name = prompt("Enter your name: ");

// console.log("Hello " + name);
//akta func r modhe r akta func cll hol callback func








//callback func
// const add=function(a,b,prince){
//   var res=a+b;
//   console.log(res)
//   prince()
// }

// add(2,4,function(){
//   console.log("iswiusi")
// })

// add(2,4,()=>console.log("sijdidjj"))





// var fs=require('fs')
// var os=require('os')
// var user=os.userInfo()
// console.log(user)
// console.log(user.username)

// //fs file banate help kre
// fs.appendFile('hii.txt',"ohh hello \n",()=>{
//   console.log("file created")
// })





//database server-akta special proGram jeta database k up rakte help kre like node js server

//monodb compass dbs k raphically ui provide kre
//compass r server chai run r jonno er kj jodi db r server up hoi ota db r sthe interraction krte help kre






// const express=require("express")
// const app=express()

// const port=3000

// app.get("/users",(req,res)=>{
//     res.send("hii")
// })
// //omno kono route a eke jte err dekai
// app.use((req,res,next)=>{
//     res.status(404).json({
//         messaGe:"resource notfound"
//     })
// })
// app.listen(port,()=>{
//     console.log(`servr runin http://localhost:${port}`)
// })




//Get a server data show kre frontnd k.monGose a dbr blueprint thke ata dbr kono operation perform krar aGe sob kichu check kre ata servr r dbr mje layer hisab kj kre ata dbr interaction baranor help kre interraction r jono sob functionality atat provide kre.monGodbr Gui monGodb compass






//this  is old version not need now

// const mongoose=require('mongoose')

// //define monGodb connection url
// const url='mongodb://localhost:27017/hotel'

// //monodb connection
// mongoose.connect(url,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })
// //monGoose default connection obj maintain kre jeta db connection  a help kre.db obj use kre node r db r modhe conection bridGe establish kri
// const db=mongoose.connection

// //eventlistener-connected err aGulo event listnr keywird, db sobkichu sunte pai
// db.on('connected',()=>{
//     console.log("connected")
// })

// db.on('error',(err)=>{
//     console.log("errors",err)
// })

// db.on('disconnected',()=>{
//     console.log("disconnected")
// })


// //export the db conecyton.db monGodb connection k reptesent kre
// module.exports=db





const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/hotel")
.then(()=>{
    console.log("Database connected")
})


.catch((err)=>{
    console.log(err)
})