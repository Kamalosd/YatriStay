const express=require("express")
const router=express.Router()
const MenuItem=require('../models/MenuItem')



router.post("/",async(req,res)=>{
       try{
   const data=req.body//body parsr r throuG daat req bd te asbe.newitem nm a obj banalm

   const newMenu=new MenuItem(data)
   
 
    const saveMenu= await newMenu.save()
    console.log('data save')
    res.status(200).json(saveMenu)
    }

    catch(err){
            console.log(err)
    res.status(500).json({error:'internal server error'})

    }
    
})


router.get("/",async(req,res)=>{
   try{
    const data= await MenuItem.find()
       console.log('data fetch ')
    res.status(200).json(data)
   }

   catch(err){
              console.log(err)
    res.status(500).json({error:'internal server error'})
   }
})

module.exports=router



