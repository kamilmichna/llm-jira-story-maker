import { model } from "../main";
import { nextStep, StateAnnotation } from "../state";

export const storyCreator = async (state: typeof StateAnnotation.State) => {
    const SYSTEM_TEMPLATE = `
    Take the following business requirement and convert it into a user story using the format:

    As a [user role]
    I want to [goal/action]
    So that [reason/benefit].

    Below user story, output technical notes, that will describe step by step what needs to be done to resolve this task:
    Technical Notes:

    `;

    const response = await model.invoke([
        {
            role: "system",
            content: SYSTEM_TEMPLATE,
        },
        ...state.messages,
    ]);

    return {
        messages: response,
        userStory: response.content,
        nextStep: nextStep.ESTIMATION,
    };
};
