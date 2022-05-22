const express=require('express');
const {body, validationResult}=require('express-validator')
const req = require('express/lib/request');
const app=express();
app.use(express.json());
let users=require('./users.js')
app.get('/api/users',(req,res)=>{
    res.json({
        data:users,
        message:'ok'
    });
});

app.get('/api/users/:id',(req,res)=>{
    const user=users.find((a)=>a.id===parseInt(req.params.id));
    if(!user)
        { return res.json({
        data:null,
        message:'the user is not here'
        });
        }
    res.json({
        data:user,
        message:'ok'
    });
});

app.post('/api/users/',[
    body('email','email must be valid').isEmail(),
    body('first_name','first name cant be empty').notEmpty(),
    ],(req,res)=>{
    const errors = validationResult(req);
        if(!errors.isEmpty()){
        return res.status(400).json({data:null, errors:errors.array(),message:"validation error"})
        }
    users.push({id:users.length + 1, ...req.body})
    res.json({
        data:users,
        message:'ok'
    });

});

app.put('/api/users/:id',[
    body('email','email must be valid').isEmail(),
    body('first_name','first name cant be empty').notEmpty(),
    ],(req,res)=>{
    const user= users.find((a)=> a.id===parseInt(req.params.id))
        if(!user){
           return res.status(404).json({
           data:null,
           message:'the user is not here'
           });
        }
    
    const errors = validationResult(req);
        if(!errors.isEmpty()){
        return res.status(400).json({data:null, errors:errors.array(),message:"validation error"})
        }

    users =users.map(user=>{
        if(user.id==req.params.id){
        return {...user, ...req.body}
        }
        return user;
    })

    res.json({
    data:users,
    message:'ok'
    });

});

app.delete('/api/users/:id',(req,res)=>{
    const user= users.find((a)=> a.id===parseInt(req.params.id))
        if(!user){
           return res.status(404).json({
           data:null,
           message:'the user is not here'
           });
        }
    
    const index= users.indexOf(user);
    users.splice(index,1);
    res.json({
        data:users,
        message:'ok'
    });



});

const port=process.env.PORT || 3000;
app.listen(port,()=>
    console.log('listening on port:'+port));
