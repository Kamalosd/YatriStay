const mongoose=require("mongoose")
const initData=require("./data")

const listing=require("../models/listing")
mongoose.connect('mongodb://127.0.0.1:27017/hotelapp')
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.log(err);
});

const initDb=async()=>{
  await listing.deleteMany({})//already data thke db a aGe clean thn insert
  await listing.insertMany(initData.data)
}

initDb()