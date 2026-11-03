import type {
    SystemOneQuestion,
    SystemOneRequest,
    SystemOneResponse,
} from "ollama";
import { getAnswerText } from "./displayers.js";
import type { Problem } from "./interfaces.js";

const states = [
    "If it rains, the ground gets wet. The ground is wet.",
    "If it rains, the ground gets wet. The ground is not wet.",
    "If it rains, the ground gets wet. It has rained.",
    "If it rains, the ground gets wet. It has not rained.",
];

// const state = "If it rains, the ground gets wet.";

const questions: Record<string, SystemOneQuestion> = {
    isWet: {
        type: "noul",
        instructions: "Is the ground wet?",
    },
    hasRained: {
        type: "noul",
        instructions: "Has it rained?",
    },
};

const makeRequest = (state: string, model: string): SystemOneRequest => ({
    model,
    state,
    questions,
});

// getRequest('kev:0.8b-q8_0');
// const getRequest = (model: string): SystemOneRequest => ({
//     model,
//     state,
//     questions,
// });

// export default getRequest;

const getRequests = (model: string): SystemOneRequest[] => {
    return states.map((state) => {
        return makeRequest(state, model);
    });
};

// Consider a fn signature that is simple but maximally flexible.
function displayAnswers(
    request: SystemOneRequest,
    response: SystemOneResponse,
) {
    console.log(request.state);

    const entries = Object.entries(request.questions);
    entries.forEach(([key, questn]) => {
        const answer = response.answers[key];
        if (!answer) return;
        const text = getAnswerText(answer);
        console.log(`${questn.instructions}\t${text}`);
    });
}

const syllogisms: Problem = { getRequests, displayAnswers };

export default syllogisms;
