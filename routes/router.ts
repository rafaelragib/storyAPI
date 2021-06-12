import express from 'express';
import {storyController} from '../controller/storyController';
import {story} from '../models/storyModel';
//var bodyParser = require('body-parser')

export const router=express();
//var jsonParser = bodyParser.json()
const stories =storyController(story);
router.use(express.json());
router.get('/',(req,res)=>
{
       
    res.send("welcome");
})
router.get('/story',stories.getStory);
router.get('/story/:id',stories.getStoryById);
router.post('/story',stories.createStory);
router.delete('/story/:id',stories.deleteStory);


 