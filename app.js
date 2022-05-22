const express=require('express');
const req = require('express/lib/request');
const app=express();
const morgan = require('morgan')
const config = require('config')
const userRouter=require('./routes/users');
const { Router } = require('express');
app.use(express.json());
app.use (express.urlencoded({extended:true}));
app.use (express.static("public"));
app.set('view engine','ejs');
app.set('views','./views');
/*
console.log('Application Name:',config.get("name"))
console.log('version:',config.get("version"))
console.log('sms:',config.get("sms.ip"))
//console.log('smsKey:',config.get("sms.key"))
if(app.get('env')==='development'){
    console.log('morgan is active');
    app.use(morgan('tiny'));
}
*/
app.get('/',(req,res)=>{
    res.render('home')
});
app.use('/api/users',userRouter)

const port=process.env.PORT || 3000;
app.listen(port,()=>
    console.log('listening on port:'+port));

