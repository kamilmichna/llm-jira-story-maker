import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

export enum nextStep {
    HUMAN = "humanInput",
    RESEARCHER = "researcher",
    END = "__end__",
    STORY_CREATOR = "storyCreator",
    ESTIMATION = "estimation",
}

export const StateAnnotation = Annotation.Root({
    ...MessagesAnnotation.spec,
    nextStep: Annotation<nextStep>,
    userStory: Annotation<string>,
    question: Annotation<string>,
});
