import { StateAnnotation } from "../state";
import { createInterface } from "readline/promises";
export const humanInput = async (state: typeof StateAnnotation.State) => {
    let humanPrompt = await prompt(
        (state.question || "Write about task that you want to make:") +
            "\n Your answer: "
    );
    while (!humanPrompt.length) {
        console.log("You need to answer this question");
        humanPrompt = await prompt("hello");
    }

    return {
        messages: humanPrompt,
    };
};

const prompt = async (message) => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const answer = await rl.question(message);

    rl.close(); // stop listening
    return answer;
};
