//taa akrta func

// const app=require('./app')

// const port=3008
// app.listen(port,()=>{
//     console.log(`servr is runnin at http://localhost:${port}`)
// })

//req,res r maje je code Gulo execute hoi,servr a jokon req asbe response r aGe ata execute hoi,ata sotorkota mulok kj kre
//req limitinG mne lie1 min a 600 r bsi req asbe na ar baire ale servr kono response debe na
//servr a akta nirdisto somoi a koto Gulo req asbe sei limit setr kj take ble req limitinG
//atar obosthan 2 type.







const express=require("express")
const app=express()
const db=require('./app')
require('dotenv').config()//.env file ta servr k janate hbe ti confiGure,servr bujte pre ar pase .env file ache, arsahaje all avr otabe


const person=require('./models/person')//person model dia sob db connectivity krbo
const MenuItem=require('./models/MenuItem')


const bodyParser=require('body-parser')
app.use(bodyParser.json())//json data vejbo tai ata use nahole onno kichu use krtm json r jaiGai


//  /person a jokom e keu data vejbesave krbo.callback main func execute hoar por run kre
// app.post("/person",async(req,res)=>{
//        try{
//    const data=req.body//asume req.body contain person data

//    //create a neew person document usin monose model
//    const newPerson=new person(data)
   
//    //save the new person to db
//     const savePerson= await newPerson.save()//async lGiachi kron ar mode db operation ache ota time nebe.jodi err ase catch a jbe
//     console.log('data save')
//     res.status(200).json(savePerson)
//     }

//     catch(err){
//             console.log(err)
//     res.status(500).json({error:'internal server error'})

//     }
    
// })


// //Get method to Get person detail
// app.get("/person",async(req,res)=>{
//    try{
//     const data= await person.find()//prson collection a sob record fetch
//        console.log('data fetch success')
//     res.status(200).json(data)
//    }

//    catch(err){
//               console.log(err)
//     res.status(500).json({error:'internal server error'})
//    }
// })

// app.listen(port,()=>{
//     console.log(`servr runin http://localhost:${port}`)
// })







// app.post("/menu",async(req,res)=>{
//        try{
//    const data=req.body//body parsr r throuG daat req bd te asbe.newitem nm a obj banalm

//    const newMenu=new MenuItem(data)
   
 
//     const saveMenu= await newMenu.save()
//     console.log('data save')
//     res.status(200).json(saveMenu)
//     }

//     catch(err){
//             console.log(err)
//     res.status(500).json({error:'internal server error'})

//     }
    
// })


// app.get("/menu",async(req,res)=>{
//    try{
//     const data= await MenuItem.find()
//        console.log('data fetch ')
//     res.status(200).json(data)
//    }

//    catch(err){
//               console.log(err)
//     res.status(500).json({error:'internal server error'})
//    }
// })






// //parameterize url...worktype variable,ai url a hit krle data anbo
// app.get("/person/:workType",async(req,res)=>{
//    try{
// //worktype fetch fst,db operation bar bar hit na krevalidation LGia dbo
//       const workType=req.params.workType
//       if(workType=='chef'||workType=='manager'||workType=='waiter'){

//            const data= await person.find({work:workType})//workfield a wrktpye pass
//        console.log('data fetch ')
//     res.status(200).json(data)
        
//       }else{
//           res.status(404).json({error:"invalid work type"})
//       }

//    }

//    catch(err){
//               console.log(err)
//     res.status(500).json({error:'internal server error'})
//    }
// })


//import the router file
const personRoutes=require('./routes/personRoutes')

const menuItemRoutes=require('./routes/menuItemRoutes')





//use the routers./person a jokon hit krbe personroutes a jbe then ceck Get post method
app.use('/person',personRoutes)
app.use('/menu',menuItemRoutes)

const PORT=process.env.PORT||3003//process.env.PORT a jodi port r val present hle oi port no use hobe.otherwise 3003. node k jokon online servr a host krbo machine khud ka port no deta hai,

app.listen(PORT,()=>{
    console.log(`servr runin http://localhost:${PORT}`)
})