import type {
    SystemOneNoulAnswer,
    SystemOneQuestion,
    SystemOneRequest,
    SystemOneResponse,
} from "ollama";
import type { Problem } from "./interfaces.js";

const state = `
All men are mammals.
All whales are mammals.
No mammals are fish.
All guppies are fish.
All mammals are mortal.
Socrates is a man.
Moby is a whale.
Nemo is a guppy.
`;

const questions: Record<string, SystemOneQuestion> = {
    isMortal: {
        type: "noul",
        instructions: "Is Socrates mortal?",
    },
    isWhaleAFish: {
        type: "noul",
        instructions: "Is Moby a fish?",
    },
    isWhaleAMan: {
        type: "noul",
        instructions: "Is Moby a man?",
    },
    isGuppyAMammal: {
        type: "noul",
        instructions: "Is Nemo a mammal?",
    },
    isWhale: {
        type: "noul",
        instructions: "Is Socrates a whale?",
    },
    isGroup: {
        type: "noul",
        instructions: "Are all guppies whales?",
    },
    isGroup2: {
        type: "noul",
        instructions: "Are men also whales?",
    },
    isKnown: {
        type: "noul",
        instructions: "Is Nemo mortal?",
    },
};

const expectedMap: Record<string, number> = {
    isMortal: 1,
    isWhaleAFish: 0,
    isWhaleAMan: 0,
    isGuppyAMammal: 0,
    isWhale: 0,
    isGroup: 0,
    isGroup2: 0,
    isKnown: 0.5,
};

// getRequest('kev:0.8b-q8_0');
const getRequests = (model: string): SystemOneRequest[] => [
    {
        model,
        state,
        questions,
    },
];

function toPercent(confidence: number) {
    return `${Math.round(100 * confidence)}%`;
}

function displayAnswers(req: SystemOneRequest, res: SystemOneResponse) {
    const entries = Object.entries(req.questions);
    entries.forEach(([key, question]) => {
        const qText = question.instructions;
        const answer = res.answers[key] as SystemOneNoulAnswer;
        if (!answer) return;
        const expected = expectedMap[key];
        console.log(
            `${key}: ${qText}\n\tActual: ${toPercent(answer.noul)}, Expected: ${expected}`,
        );
    });
}

const socrates: Problem = { getRequests, displayAnswers };
export default socrates;
