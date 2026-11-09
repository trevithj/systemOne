// Sally-Anne test
import type {
    SystemOneQuestion,
    SystemOneRequest,
    SystemOneResponse,
} from "ollama";
import type { Problem } from "./interfaces.js";

const state = `
Scenario:
1. In a room, there are two individuals named Sally and Anne.
2. In the room, there is an opaque basket and an opaque box.
3. Sally places a green marble inside the basket.
4. Sally then leaves the room, closes the door behind her, and cannot see or hear anything happening inside.
5. While Sally is away, Anne approaches the basket, removes the green marble, and places it inside the box.
6. Anne closes the box so the marble is hidden.
7. Sally returns to the room and looks for the marble.
`;

const questions: Record<string, SystemOneQuestion> = {
    lookBox: {
        type: "noul",
        instructions: "Does Sally look for the marble in the box first?",
    },
    lookBasket: {
        type: "noul",
        instructions: "Does Sally look for the marble in the basket first?",
    },
    inBox: {
        type: "noul",
        instructions: "Is the marble now in the box?",
    },
    inBasket: {
        type: "noul",
        instructions: "Is the marble now in the basket?",
    },
    whereMarble: {
        type: "choice",
        instructions: "Where is the marble now?",
        criteria: {
            box: "The marble is in the box",
            basket: "The marble is in the basket",
            pocket: "The marble is Anne's pocket",
            other: "The marble not in the room",
        },
    },
    whereLook: {
        type: "choice",
        instructions: "Where does Sally look for the marble first?",
        criteria: {
            box: "Sally first looks in the box",
            basket: "Sally first looks in the basket",
            pocket: "Sally first looks in Anne's pocket",
            other: "Sally first looks outside the room",
        },
    },
};

const expectedMap: Record<string, string> = {
    lookBox: "No 0",
    lookBasket: "Yes 1",
    inBox: "Yes 1",
    inBasket: "No 0",
    whereMarble: "box",
    whereLook: "basket",
};

// const displayAnswers = defaultDisplayAnswers;
function displayAnswers(req: SystemOneRequest, res: SystemOneResponse) {
    const entries = Object.entries(req.questions);
    entries.forEach(([key, question]) => {
        const qText = question.instructions;
        const answer = res.answers[key];
        if (!answer) return;
        const expected = expectedMap[key];
        if (answer.type === "noul") {
            console.log(
                `${key}: ${qText}\n\tExpected: ${expected}, Actual: ${answer.noul}`,
            );
        } else if (answer.type === "choice") {
            const actual = `${answer.choice} ${answer.confidence}`;
            console.log(
                `${key}: ${qText}\n\tExpected: ${expected}, Actual: ${actual}`,
            );
        } // else not implementing Score yet
    });
}

// getRequests('kev:0.8b-q8_0');
const getRequests = (model: string): SystemOneRequest[] => [
    {
        model,
        state,
        questions,
    },
];

const sallyAnn: Problem = {
    getRequests,
    displayAnswers,
};
export default sallyAnn;
