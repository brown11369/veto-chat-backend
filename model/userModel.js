const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:4,
        max:15,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    photoURL:{
        type:String,
        default:"",
    }
})

module.exports =mongoose.model("users",userSchema)