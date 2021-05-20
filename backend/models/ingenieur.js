const mongoose =require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')
const schema = mongoose.Schema;

const ingenieurSchema = new schema({
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlenght:8},
    telephone:{type:String,required:true,minlenght:8},
    
   


})

ingenieurSchema.plugin(uniqueValidator)

module.exports = mongoose.model('ingenieur',ingenieurSchema)