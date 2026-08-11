const mongoose = require("mongoose")
const initData = require("./data")

const listing = require("../models/listing")
const User = require("../models/user.js")

mongoose.connect('mongodb://127.0.0.1:27017/YatriSathi')
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.log(err);
});

const initDb = async () => {
    await listing.deleteMany({})

    const user = await User.findOne()

    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: user._id
    }))

    await listing.insertMany(initData.data)
}

initDb()

//already data thke db a aGe clean thn insert