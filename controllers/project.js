import * as Project from "../db/services/project";

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.findAllProjects();
        return res.status(200).json(projects);
    } catch(error) {
        return res.status(400).json(error.message);
    }
};

export const getProject = async (req, res) => {
    const {projectId} = req.params;

    try {
        if (!projectId) {
            throw new Error({status: 400, message: 'bookId is empty'})
        }

        const oneProject = await Project.findOneProject(projectId);
        return res.status(200).json(oneProject)
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const createProject = async (req, res) => {
    const params = req.body;
    const user_ids = JSON.parse(params.user_ids);
    const technology_ids = JSON.parse(params.technology_ids);

    try {
        if (!params) {
            throw new Error({status: 400, message: 'params for creating user is empty'})
        }

        const createdProject = await Project.createProject(params);

        createdProject.addDevelopers(user_ids);
        createdProject.addTechnologies(technology_ids);

        return res.status(200).json(createdProject)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

export const updateProject = async (req, res) => {
    const {title, images, groups} = req.body;
    const {projectId} = req.params;

    try {
        const params = {
            title,
            images,
            groups,
        };

        if (!params) {
            throw new Error({status: 400, message: 'params for creating user is empty'})
        }

        const updatedProject = await Project.updateProject(projectId, params);
        return res.status(200).json(updatedProject)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};
