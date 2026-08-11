const cloudinary=require('cloudinary')
const {cloudinaryStorage}=require('multer-storage-cloudinary')

cloudinary.config({
  CLOUD_NAME:process.env.CLOUD_NAME,
  CLOUD_API_KEY:process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET:process.env.CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Yatrisathi',
    allowedFormats: ["png","jpg"]
  },
});


module.exports={
  cloudinary,
  storage
}