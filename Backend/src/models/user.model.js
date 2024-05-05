import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            index:true,
        },
        avatar:{
            type:String, //Cloudinary URL
            required:true,
        },
        password:{
            type:String, //In database the password is stored as encrypted using bycryptjs package(npm install bcryptjs)
        },
        refreshToken:{
            type:String,
        },
        fromGoogle:{
            type:Boolean,
            default: false
        },
        role:{
            type: String,
            enum: ["user", "admin"],
            default:"user"
        },
        contactNo:{
            type:Number,
            required:true
        },

        formsSubmitted:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "FeedbackForm"
            }
        ]
    },{timestamps:true})

//pre is a middleware which will run before saving the data in database in mongoose
    userSchema.pre("save", async function (next){ //do not use arrow function because it will not save the context
    if(!this.isModified("password")) return next(); //use only when user wants to store the password not during all the times like while updating the avatar or coverpage
    this.password = await bcrypt.hash(this.password,10) //10 is number of rounds to be used to encrypt
    next()
}) 
//here we are not using the arrow function because arrow function wont save the context so we use normal function
//This pre will encrypty the passsword befaore saving the data in database


//custom method isPasswordCorrect injected into the userSchema
userSchema.methods.isPasswordCorrect = async function(password){ 
  return await bcrypt.compare(password,this.password)
   //returns true or false
}

userSchema.methods.addToWatchHistory = async function(videoId) {
    if (!this.watchHistory.includes(videoId)) {
        this.watchHistory.push(videoId);
        await this.save();
    }
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName:this.fullName //right side things are coming from database
        },
        process.env.ACCESS_TOKEN_SECRET_KEY, //This is the secret key which is used to encrypt the data
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,//This is the secret key which is used to encrypt the data
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema) //In mongodb "User" will be saved as "users"