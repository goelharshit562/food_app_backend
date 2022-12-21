const mongoose = require("mongoose");
let {PASSWORD} = process.env

let DB_LINK = `mongodb+srv://admin:${PASSWORD}@cluster0.3gwfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(DB_LINK).then(function () {
    // console.log(db);
    console.log("connected to db 1")
}).catch(function (err) {
    console.log("err", err);
})
const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Review can't be empty"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Review must contain some rating"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        // info
        type: mongoose.Schema.ObjectId,
        required: [true, "Review must belong to a user"],
        ref:"PABUserModel"
    },
    plan: {
        // info
        type: mongoose.Schema.ObjectId,
        required: [true, "Review must belong to a plan "],
        ref:"PABPlanModel"
    }
})
const ReviewModel = mongoose.model("reviewModel", reviewSchema);
module.exports = ReviewModel;