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

    return {getStory}
}