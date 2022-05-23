const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/Mongo')
    .then(()=>console.log('connected to mongo'))
    .catch((err)=>console.log('could not connect to mongo'));

const userSchema=new mongoose.Schema({
    first_name:String,
    last_name:{type:String,require:true},
    favorites:[String],
    admin:Boolean,date:{type:Date,default:Date.now}
});


const User=mongoose.model('User',userSchema);


async function createUser(){
    const user=new User({
        first_name:'Ehsan',
        last_name:'Bavil',
        favorites:['Ship','Music','Womans:D'],
        admin:false
    });

    const result= await user.save();
    console.log(result);
};


//createUser();


async function getUsers(){
    const users= await User.find({last_name:{$eq:'Bavil'}}).sort({first_name:1});
    console.log(users);
}

//getUsers();


async function updateUser_1(id){ // Comment: Update with First aproach
    const user = await User.findById(id);
    if(!user)return;
    user.set({
        first_name:'Liana',
        admin:true
    });
    await user.save();

}

//updateUser() Comment: Please Enter a ID number

async function updateUser_2(id){ // Comment: Update with Second aproach
    const result = await User.update({_id:id}, {
    
    $set:{
        first_name: 'Payman'
    }
   });
    console.log(result)

}

updateUser_2(("628b016ce291f683ed1d4265")) //Comment: Please Enter a ID number
