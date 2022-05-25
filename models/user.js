const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/Mongo')
    .then(()=>console.log('connected to mongo'))
    .catch((err)=>console.log('could not connect to mongo'));
const userSchema=mongoose.Schema({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true},
});
const User=mongoose.model('User',userSchema);

module.exports=User