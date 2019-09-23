import PlanTasks from "../models/planTasks";

export const updateTaskOfPlan = async (params) => {
    return PlanTasks.update({
            ...params
        },
        {
            where: {
                task_id: params.taskId,
                plan_id: params.planId,

            },
            returning: true,
        })

};