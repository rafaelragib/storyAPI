import mongoose from "mongoose";
export const storyController = (story: any) => {
    async function getStory(req: any, res: any) {

        try {

            const stories = await story.find({});
            const storyJSON = stories.map((ele: any) => {
                ele = ele.toJSON();
                ele.links = {};
                ele.links.self = `http://localhost:3000/story/${ele._id}`;
                return ele;
            })
            res.status(200);
            return res.send(storyJSON);
        }
        catch (error) {
            res.status(500);
            console.log(error);
            return res.send(error);
        }

    }

    async function getStoryById(req: any, res: any) {

        try {
            const id: string = req.params.id;
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                const stories = await story.findById(id);
                if (stories) {
                    res.status(200);
                    return res.send(stories);
                }
                else
                {
                    res.status(404);
                    return res.send("No story");
                }
            }
            else {
                res.status(400);
                return res.send("Object id is not 25 hex character");
            }


        }
        catch (error) {
    res.status(500);
    console.log(error);
    return res.send(error);
}

    }

async function createStory(req: any, res: any) {
    try {
        const newStory = await story.create({
            'title': req.body.title,
            'body': req.body.body
        });
        if (newStory) {
            res.status(201);
            return res.send(newStory);
        }
        res.status(500);
        return res.send("Internal Problem");
    }
    catch (error) {
        res.status(400);
        return res.send("Bad Request");
    }
    //return res.send(req.body);
}

async function deleteStory(req: any, res: any) {
    try {

        const id = req.params.id;
        const stories = await story.find({ '_id': id });
        if (stories.length <= 0) {
            res.status(404);
            return res.send("not found");
        }

    }
    catch (error) {
        res.status(500);
        return res.send("Internal Server Error");
    }

}

return { getStory, getStoryById, createStory, deleteStory }
}