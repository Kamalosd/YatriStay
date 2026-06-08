
const express=require("express")
const router=express.Router()
const person=require('../models/person')

//person sob jaiGai common tai del 
router.post("/",async(req,res)=>{
       try{
   const data=req.body//asume req.body contain person data

   //create a neew person document usin monose model
   const newPerson=new person(data)
   
   //save the new person to db
    const savePerson= await newPerson.save()//async lGiachi kron ar mode db operation ache ota time nebe.jodi err ase catch a jbe
    console.log('data save')
    res.status(200).json(savePerson)
    }

    catch(err){
            console.log(err)
    res.status(500).json({error:'internal server error'})

    }
    
})





//Get method to Get person detail
router.get("/",async(req,res)=>{
   try{
    const data= await person.find()//prson collection a sob record fetch
       console.log('data fetch success')
    res.status(200).json(data)
   }

   catch(err){
              console.log(err)
    res.status(500).json({error:'internal server error'})
   }
})




router.get("/:workType",async(req,res)=>{
   try{
//worktype fetch fst,db operation bar bar hit na krevalidation LGia dbo
      const workType=req.params.workType
      if(workType=='chef'||workType=='manager'||workType=='waiter'){

           const data= await person.find({work:workType})//workfield a wrktpye pass
       console.log('data fetch ')
    res.status(200).json(data)
        
      }else{
          res.status(404).json({error:"invalid work type"})
      }

   }

   catch(err){
              console.log(err)
    res.status(500).json({error:'internal server error'})
   }
})


//id parameter variable,monGodb je id privide kre oi id
router.put('/:id',async(req,res)=>{
   try{
    const persionId=req.params.id//extract id from url parameter
    const updatedPersonData=req.body//updated data for person.body parser je data client send kre otareq.body te veje sv kre.client je data vejbe parametr r throuGh rbody te data json a throuGh
    const response=await person.findByIdAndUpdate(persionId,updatedPersonData,{
       new:true,//update hoar por je doc bnbe oas a response update krbe
       runValidators:true//monGose a je validation lGiachi like required true aGulo check krbe
       
    })
//jodi response ata null ase,fst obj id dia find krbe kon doc taa,personid te kono doc present na hle return null
    if(!response){

   return res.status(404).json({error:'person not found'})
    }


    console.log('data updated');
    res.status(200).json(response)

//id obj id,thn je data update krbo seta pass
   }catch(err){
    
      console.log(err)
    res.status(500).json({error:'internal server error'}) 

   }
})



router.delete('/:id',async(req,res)=>{
   try{
    const persionId=req.params.id//extract id from url parameter

 //assum u have a prsn model
    const response=await person.findByIdAndDelete(persionId)

    if(!response){

   return res.status(404).json({error:'person not found'})
    }


    console.log('data deleted');
    res.status(200).json({messaGe:'person deleted successfully'})

//id obj id,thn je data update krbo seta pass
   }catch(err){
    
      console.log(err)
    res.status(500).json({error:'internal server error'}) 

   }
})

//comment
module.exports=router


//Git s/w amdr proj k watch kre sob foldr track kre red dekai ststus karon sv krini file Gulo k akokno mne Git k blbo ai file sv krte chai tumare pas.ami chai ar sanpshot sv krte tai Git commi -m thn sv hoia jbe.comment add krleo fine modified dekabe,thn local repo k Github r sthe connection.onno keu sm repo te jodi chnGe kre oat amr local mchina jte ase tar jonno it pull.monodb db k host krar jono monGodb atlas,bec db amrav localy setup krechi tar drun operation hoche,ami chai online jaiGai present hok jar jono sobai acces krte pre,so db server a db add krbo
