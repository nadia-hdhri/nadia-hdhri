const mongoose =require("mongoose")
const schema = mongoose.Schema;

const AgriculteurSchema = new schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlenght:8},


})

module.exports = mongoose.model('Agriculteur',AgriculteurSchema)