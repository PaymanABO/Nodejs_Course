const express=require('express');
const req = require('express/lib/request');
const app=express();
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
const port=process.env.PORT || 3000;
app.listen(port,()=>
    console.log('listening on port:'+port));
