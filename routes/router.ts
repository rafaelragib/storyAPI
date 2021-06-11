import express from 'express';
import {storyController} from '../controller/storyController';
import {story} from '../models/storyModel';
export const router=express();

const stories =storyController(story);

router.get('/',(req,res)=>
{
       
    res.send("welcome");
})
router.get('/story',stories.getStory)
 