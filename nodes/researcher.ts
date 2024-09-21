// this is first - line agent that will handle reviewing business needs and

import { model } from "../main";
import { nextStep, StateAnnotation } from "../state";

// ask for clarification
export const researchAgent = async (state: typeof StateAnnotation.State) => {
    const SYSTEM_TEMPLATE = `
        You are worker responsible for gathering and clarifying business requirements for a task.
        You can chat with a user, and ask questions until you get clear vision what needs to be done.
        If you think that no more clarification is needed, respond with only one word: "DONE". Remeber to output only this word, if user requirements are clear.
        Your job is not to generate the code, just to gather business requirements from the user.

        examples
        """
        I want to create a game
        """

        then ask for clarification

        """
        I want to create script in python that will output "Hello" to the user
        """
        hence the requirements ale clear, and you don't need further clarification, output:

        your output: 'DONE'

        REMEMBER TO OUTPUT ONLY THIS SINGLE WORD
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
        question: response.content,
        nextStep: response.content.toString().includes("DONE")
            ? nextStep.STORY_CREATOR
            : nextStep.HUMAN,
    };
};
