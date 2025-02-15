const express=require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchUser');
const Notes=require('../models/Notes');

// ROUTE 1: GET ALL THE NOTES
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    const notes= await Notes.find({user:req.user.id});
    res.json(notes);
    
})

// ROUTE 2: ADD NOTES TO DATABASE
router.post('/addnotes',fetchuser,async(req,res)=>{
    try{
        const title=req.body.title;
        const description=req.body.description;
        const tag=req.body.tag;

        const note=new Notes({
            user:req.user.id,
            title: title,
            description: description,
            tag: tag
        })
        const addNotes=await note.save();
        res.status(200).send(addNotes);
    }catch(err){
        res.status(400).send({error:err});
    }
})


// ROUTE 3: UPDATE AN EXISTING NOTE
router.put('/updatenotes/:id',fetchuser,async (req,res)=>{
    try{
        const title=req.body.title;
        const description=req.body.description;
        const tag=req.body.tag;

        const newNote={};
        if(title){
            newNote.title= title;
        };
        if(description){
            newNote.description= description;
        };
        if(tag){
            newNote.tag= tag;
        };

        let note=await Notes.findById(req.params.id);
        if(!note){
            res.status(404).send({error:"NOT FOUND"});
        }
        if(note.user.toString()!==req.user.id){
            res.status(401).send({error:"NOT ALLOWED"});
        }
        note=await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
        res.status(200).send(note);
        
    }catch(err){
        res.status(500).send({error: err});
    }
})

// ROUTE 4: DELETE NOTE
router.delete('/deletenotes/:id',fetchuser,async (req,res)=>{
    try{
        let note=await Notes.findById(req.params.id);
        if(note.user.toString()!==req.user.id){
            res.status(401).send({error:"NOT ALLOWED"});
        }
        note=await Notes.findByIdAndDelete(req.params.id);
        res.status(200).send(note);
        
    }catch(err){
        res.status(500).send({error:"CANNOT DELETE"});
    }
})
module.exports=router;