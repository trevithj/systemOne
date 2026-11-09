import type {
    SystemOneNoulAnswer,
    SystemOneQuestion,
    SystemOneRequest,
    SystemOneResponse,
} from "ollama";
import type { Problem } from "./interfaces.js";

const states = [
    "If it rains, the ground gets wet. The ground is wet.",
    "If it rains, the ground gets wet. The ground is not wet.",
    "If it rains, the ground gets wet. It has rained.",
    "If it rains, the ground gets wet. It has not rained.",
];

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

function toPercent(confidence: number) {
    return `${Math.round(100 * confidence)}%`;
}

function displayAnswers(req: SystemOneRequest, res: SystemOneResponse) {
    const entries = Object.entries(req.questions);
    console.log(req.state);
    entries.forEach(([key, question]) => {
        const qText = question.instructions;
        const answer = res.answers[key] as SystemOneNoulAnswer;
        if (!answer) return;
        console.log(
            `${key}: ${qText}\n\tActual: Yes=${toPercent(answer.noul)}`,
        );
    });
}

const getRequests = (model: string): SystemOneRequest[] => {
    return states.map((state) => {
        return makeRequest(state, model);
    });
};

const syllogisms: Problem = { getRequests, displayAnswers };

export default syllogisms;
