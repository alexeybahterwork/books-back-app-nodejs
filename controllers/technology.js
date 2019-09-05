import * as Technology from "../middlewares/technology";

export const getTechnologies = async (req, res) => {
    try {
        const technologies = await Technology.findAllTechnologies();
        return res.status(200).json(technologies);
    } catch(error) {
        return res.status(400).json(error.message);
    }
};

export const getTechnology = async (req, res) => {
    const {technologyId} = req.params;

    try {
        if (!technologyId) {
            throw new Error({status: 400, message: 'bookId is empty'})
        }

        const oneTechnology = await Technology.findOneTechnology(technologyId);
        return res.status(200).json(oneTechnology)
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const createTechnology = async (req, res) => {
    const params = req.body;
    // const project_ids = JSON.parse(params.project_ids)

    try {
        if (!params) {
            throw new Error({status: 400, message: 'params for creating user is empty'})
        }

        const createdTechnology = await Technology.createTechnology(params);
        // createdTechnology.addProjects(project_ids);

        return res.status(200).json(createdTechnology)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

export const updateTechnology = async (req, res) => {
    const {title, images, groups} = req.body;
    const {technologyId} = req.params;

    try {
        const params = {
            title,
            images,
            groups,
        };

        if (!params) {
            throw new Error({status: 400, message: 'params for creating user is empty'})
        }

        const updatedTechnology = await Technology.updateTechnology(technologyId, params);
        return res.status(200).json(updatedTechnology)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};
