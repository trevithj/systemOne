// Sally-Anne test

import type { SystemOneQuestion, SystemOneRequest } from "ollama";

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

// getRequest('kev:0.8b-q8_0');
const getRequest = (model: string): SystemOneRequest => ({
    model,
    state,
    questions,
});

export default getRequest;
