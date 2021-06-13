import express from 'express';
import {storyController} from '../controller/storyController';
import {story} from '../models/storyModel';


export const router=express();
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
router.put('/story/:id',stories.updateStory);


 