import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { StateAnnotation } from "./state";
import { researchAgent } from "./nodes/researcher";
import { humanInput } from "./nodes/humanInput";
import { storyCreator } from "./nodes/storyCreator";
import { ChatOpenAI } from "@langchain/openai";
import { estimator } from "./nodes/estimation";

export const model = new ChatOpenAI({
    apiKey: "your api key",
    model: "gpt-4o-mini",
});

const graph = new StateGraph(StateAnnotation)
    .addNode("researcher", researchAgent)
    .addNode("humanInput", humanInput)
    .addNode("storyCreator", storyCreator)
    .addNode("estimator", estimator)
    .addEdge("__start__", "humanInput")
    .addEdge("humanInput", "researcher")
    .addEdge("storyCreator", "estimator")
    .addEdge("estimator", "__end__")
    .addConditionalEdges(
        "researcher",
        async (state: typeof StateAnnotation.State) => {
            return state.nextStep;
        }
    )
    .compile();

await graph.invoke({});

console.log;
