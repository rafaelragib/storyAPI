
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
                res.status(404);
                return res.send("No story");

            }
            res.status(400);
            return res.send("ID is not 25 hex character");



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

    }

    async function deleteStory(req: any, res: any) {
        try {

            const id: string = req.params.id;
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                const deleteStory = await story.deleteOne({ _id: id });
                if (deleteStory.deletedCount === 1) {
                    res.status(200);
                    return res.send("Story Deleted");
                }
                res.status(404);
                console.log(deleteStory);
                return res.send("No story");
            }
            res.status(400);
            return res.send("ID is not 25 hex character");

        }
        catch (error) {
            res.status(500);
            console.log(error);
            return res.send(error);
        }
    }
    async function updateStory(req: any, res: any) {
        try {
            const id: string = req.params.id;
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                const stories = await story.findById(id);
                if (stories) {
                    if (typeof req.body.title === 'string' && typeof req.body.body === 'string') {
                        const updateStory = await story.updateOne({
                            title: req.body.title,
                            body: req.body.body

                        })
                        if (updateStory) {
                            res.status(200);
                            res.send("Updated");
                        }

                    }

                    console.log("title and body must be included");
                    res.status(400);
                    return res.send("error");


                }

                res.status(404);
                return res.send("No story");

            }
            res.status(400);
            return res.send("ID is not 25 hex character");

        }
        catch (error) {
            res.status(500);
            console.log(error);
            return res.send(error);
        }
    }


    return { getStory, getStoryById, createStory, deleteStory, updateStory }
}