const express=require('express')
const router=express.Router()
const fetchuser=require("../middlewere/fetchuser")
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes')
router.get('/fetchallnotes',fetchuser , async (req,res)=>{
    try{
        const notes=await Notes.find({user:req.user.id})
        res.json(notes)
    }catch(error){
        console.error(error.message)
        res.status(500).send("some eror occured")
}})
router.post('/addnote',fetchuser ,[ 
    body('title','Entr a valid title'),
    body('description','description atlist 5 charecters').isLength({min:5}),
    body('tag','Enter the alid tag')], async (req,res)=>{
    const{title, description ,tag} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   try{
    const note=new Notes({
        title, description ,tag, user: req.user.id
    })
    const saveNote=await note.save()
    res.json(saveNote)
   }catch(error){
    console.error(error.message)
    res.status(500).send("some eror occured")
}})
router.put('/updatenote/:id',fetchuser , async (req,res)=>{
    try{
        const {title, description, tag}=req.body
    const newNote={}
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    let note=await Notes.findById(req.params.id)
    if(!note){return res.status(401).send("Not Found")}
    if(note.user.toString() !==req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note =await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
    res.send({note})
    }catch(error){
        console.error(error.message)
        res.status(500).send("some eror occured")
    }
    })
router.delete('/deletenote/:id',fetchuser , async (req,res)=>{
    try{
        let note=await Notes.findById(req.params.id)
        if(!note){return res.status(401).send("Not Found")}

         if(note.user.toString() !==req.user.id){
             return res.status(401).send("Not Allowed")
         }
         note =await Notes.findByIdAndDelete(req.params.id)
        res.send({"success":"note has been deleted", note: note})
    }catch(error){
        console.error(error.message)
        res.status(500).send("some eror occured")
    }})
module.exports=router