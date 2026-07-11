const joi=require('joi')

module.exports.listingSchema=joi.object({
  listing: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    location: joi.string().required(),
    country: joi.string().required(),
    price: joi.number().required().min(0),
    image: joi.string().allow("",null)
    
  }).required()
}).required()
//for server side validation schema we use joi,with the help of joi we define schema.joi k andar obj ana chaiye,obj r nm listinG ,ata joi k accordin akta obj hona cjhaiye r required