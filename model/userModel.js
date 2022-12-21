const mongoose = require("mongoose");
let {PASSWORD} = process.env

let DB_LINK = `mongodb+srv://admin:${PASSWORD}@cluster0.3gwfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const validator = require("email-validator");

mongoose.connect(DB_LINK).then(function () {
        console.log("Connected to db 4")
    }).catch(function (err) {
        console.log("err", err);
    })
//mongoose -> data -> exact -> data -> that is required to form an entity 
//  data completness , data validation
// name ,email,password,confirmPassword-> min ,max,confirmPassword,required ,unique 
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: function () {
                // third party library 
                return validator.validate(this.email)
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        }
        ,
        confirmPassword: {
            type: String,
            required: true,
            minlength: 8,
            validate: function () {
                return this.password == this.confirmPassword
            }
        },
        createdAt: {
            type: String,

        },
        token: String,
        validUpto: Date,
        role: {
            type: String,
            enum: ["admin", "ce", "user"],
            default: "user"
        },
        bookings: {
            //   array of object id 
            type: [mongoose.Schema.ObjectId],
            ref: "bookingModel"
        },
    })
// hook
userSchema.pre('save', function (next) {
    // do stuff
    this.confirmPassword = undefined;
    next();
});
// document method
userSchema.methods.resetHandler = function (password, confirmPassword) {
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.token = undefined;
}
// model
let userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;