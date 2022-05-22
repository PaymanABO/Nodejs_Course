const express=require('express');
const router= express.Router();
const {body, validationResult}=require('express-validator')
let users=require('../users.js')


router.get('/',(req,res)=>{
    res.json({
        data:users,
        message:'ok'
    });
});

router.get('/users/:id',(req,res)=>{
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

router.post('/users/',[
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

router.put('/:id',[
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

router.delete('/:id',(req,res)=>{
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

module.exports=router;