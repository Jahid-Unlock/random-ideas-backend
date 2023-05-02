const express = require('express')
const router = express.Router();
const Idea = require('../models/Idea')

// const ideas = [
//     {
//         id: 1,
//         text: 'this is text',
//         tag: 'apple',
//         username: 'Jahid Hassan'
//     },
// ]

// get ideas
router.get('/', async (req, res)=>{
    // res.json({success: true, data: ideas});
    try{
        const ideas = await Idea.find();
        res.json({success: true, data: ideas})
    }catch(error){
        console.log(error)
        res.status(5000).json({success: false, error: 'server error'})
    }
})

// get single ideas
router.get('/:id', async (req, res)=>{

    // const idea = ideas.find((idea)=> idea.id === +req.params.id)
    // if(!idea){
    //     return res.status(400).json({success: false, error: 'Resource not found!'})
    // }

    try{
        const idea = await Idea.findById(req.params.id)
        res.json({success: true, data: idea});
    }catch(error){
        console.log(error)
        res.status(5000).json({success: false, error: 'server error'})
    }
})


// add an idea
router.post('/', async (req, res)=>{
    const idea = new Idea({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username
    })

    try{
        const savedIdea = await idea.save()
        res.json({success: true, data: savedIdea})
    }catch(error){
        console.log(error)
        res.status(5000).json({success: false, error: 'server error'})
    }
})

// update an idea 
router.put('/:id', async (req, res)=>{
    // const idea = ideas.find((idea)=> idea.id === +req.params.id);
    // if(!idea){
    //     return res.status(400).json({success: false, error: 'Resource not found!'})
    // }
    // idea.text = req.body.text || idea.text
    // idea.tag = req.body.tag || idea.tag
    // res.json({success: true, data: idea});

    try{
        const updatedIdea = await Idea.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    text: req.body.text,
                    tag: req.body.tag
                }
            },
            {new: true}
        );
        res.json({success: true, data: updatedIdea})
    }catch(error){
        console.log(error)
        res.status(5000).json({success: false, error: 'server error'})
    }
})


// delete an idea 
router.delete('/:id', async (req, res)=>{
    // const idea = ideas.find((idea)=> idea.id === +req.params.id);
    // if(!idea){
    //     return res.status(400).json({success: false, error: 'Resource not found!'})
    // }
    // const index = ideas.indexOf(idea)
    // ideas.splice(index, 1)
    // res.json({success: true, data: {}});


    try{
        await Idea.findByIdAndDelete(req.params.id);
        res.json({success: true, data: {}})
    }catch(error){
        console.log(error)
        res.status(5000).json({success: false, error: 'server error'})
    }

})


module.exports = router