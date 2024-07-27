
import mongoose from "mongoose"
import bcrypt from "bcrypt" 
import crypto from "crypto"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            "Please add a name!"
        ]
    },
    email: {
        type: String,
        required: [
            true,
            "Please add an email!"
        ],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [
            true,
            "Please add a password!"
        ]
    },
    pic:{
        type: String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
},
    {
        timestamps: true
    }
)


// **** Methods for User Model ****/

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}



userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex")
  
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex")
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000 
  
    return resetToken
  }




export default mongoose.model("User", userSchema)
