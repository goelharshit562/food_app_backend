const mongoose = require("mongoose");
let {PASSWORD} = process.env

let DB_LINK = `mongodb+srv://admin:${PASSWORD}@cluster0.3gwfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(DB_LINK).then(function () {
    // console.log(db);
    console.log("connected to db 3")
}).catch(function (err) {
    console.log("err", err);
})
const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    bookedAt: {
        type: Date
    },
    priceAtThatTime: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "failed", "sucess"],
        required: true,
        default: "pending"
    }
})
const bookingModel = mongoose.model("bookingModel", bookingSchema);
module.exports = bookingModel;