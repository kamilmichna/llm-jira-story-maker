import { model } from "../main";
import { nextStep, StateAnnotation } from "../state";

export const estimator = async (state: typeof StateAnnotation.State) => {
    const SYSTEM_TEMPLATE = `
       You are a developer. Your task is to estimate, using planning poker given story. Output should contain only your estimation.

       INPUT: Create hello world app in python
       OUTPUT: 1
    `;

    const response = await model.invoke([
        {
            role: "system",
            content: SYSTEM_TEMPLATE,
        },
        {
            role: "user",
            content: state.userStory,
        },
    ]);

    console.log(`
    This is your user story:

    USER STORY
    __________
    ${state.userStory}
    ________
    This is estimation: ${response.content}
    `);
};
