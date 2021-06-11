import express from 'express';
import {storyController} from '../controller/storyController';
import {story} from '../models/storyModel';
var bodyParser = require('body-parser')

export const router=express();
var jsonParser = bodyParser.json()
const stories =storyController(story);

router.get('/',(req,res)=>
{
       
    res.send("welcome");
})
router.get('/story',stories.getStory);
router.get('/story/:id',stories.getStoryById);
router.post('/story',jsonParser,(req,res)=>{
    // const temp={
    //     title: req.body.title,
    //     body:req.body.body
    // }
    console.log(req.body);
    res.send();

});

 