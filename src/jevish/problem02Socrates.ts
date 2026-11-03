import type { SystemOneQuestion, SystemOneRequest } from "ollama";

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

// getRequest('kev:0.8b-q8_0');
const getRequest = (model: string): SystemOneRequest => ({
    model,
    state,
    questions,
});

export default getRequest;
