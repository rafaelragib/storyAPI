export const storyController = (story:any) =>
{
    async function getStory(req:any,res:any) {
       
        try
        {
            
            const stories= await story.find({});
            const storyJSON= stories.map((ele:any) =>{
                ele=ele.toJSON();
                ele.links={};
                ele.links.self=`http://localhost:3000/story/${ele._id}`;
                return ele;
            })
            res.status(200);
            return res.send(storyJSON);
        }
        catch(error)
        {
            res.status(500);
            console.log(error);
            return res.send(error);
        }
       
    }

    async function getStoryById(req:any,res:any) {
       
        try
        {
            const id=req.params.id;
            const stories= await story.find({'_id':id});
            if(stories.length<=0){
                res.status(404);
                return res.send("not found");
            }
            else{
                res.status(200);
                return res.send(stories);
            }
            
        }
        catch(error)
        {
            res.status(500);
            console.log(error);
            return res.send(error);
        }
       
    }


    return {getStory,getStoryById}
}