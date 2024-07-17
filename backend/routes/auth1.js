const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const JWT=require("jsonwebtoken")
const fetchuser=require("../middlewere/fetchuser")
const JWT_SECRET='ABIR#1243'
//create a user using POS:"/api/auth/". dose not require auth
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','password must be 4 carecters').isLength({min:4})
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   try{
    let user=await User.findOne({email: req.body.email})
   if(user){
    return res.status(404).json({ error:"a user whith this email is already exsist"})
   }
   const salt=await bcrypt.genSalt(10)
   const secPass=await bcrypt.hash(req.body.password,salt)
   user=await User.create({
        name: req.body.name,
        email:req.body.email,
        password: secPass})
    const data={
        user:{
            id:req.id
        }
    }
    const authtoken=JWT.sign(data,JWT_SECRET)
    console.log(authtoken)
    res.json({authtoken:authtoken})
   }catch(error){
    console.error(error.message)
    res.status(500).send("some eror occured")
   }
})

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','password can not be blank').exists()
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{email,password}=req.body
    try{
        let user=await User.findOne({email})
        if(!user){
           return res.status(404).json({error:"please enter the valid credential"})
        }
        const passwordcompare= await bcrypt.compare(password,user.password)
        if(!password){
            return res.status(404).json({error:"please enter the valid credential"})
        }
        const data={
            user:{
                id:req.id
            }
        }
        const authtoken=JWT.sign(data,JWT_SECRET)
        res.json({authtoken:authtoken})
    }catch(error){
        console.error(error.message)
        res.status(500).send("some eror occured")
    }
})

router.post('/getUser',fetchuser,async (req,res)=>{
    try{
      userId=req.user.id
      const user=await User.findById(userId).select("-PassWord");
      res.send(user)
    }
    catch(error){
      console.error(error.message)
      res.status(500).send("some eror occured")
    }
    })
module.exports=router