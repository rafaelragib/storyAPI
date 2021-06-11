import mongoose from 'mongoose';


const storySchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }

    });
export const story=mongoose.model('stories',storySchema);
