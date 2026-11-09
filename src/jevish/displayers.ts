import type {
    SystemOneAnswer,
    SystemOneChoiceAnswer,
    SystemOneQuestion,
    SystemOneRequest,
    SystemOneResponse,
} from "ollama";

export function getCertaintyText(value = 0) {
    if (value < 0.15) return "I guess...";
    if (value < 0.4) return "Possibly";
    if (value < 0.6) return "Probably";
    if (value < 0.85) return "Confidently";
    return "For sure";
}

export function getNoulText(noulValue = 0) {
    if (noulValue < 0.15) return "Nope!";
    if (noulValue < 0.4) return "Not likely";
    if (noulValue < 0.6) return "Unsure...";
    if (noulValue < 0.85) return "Probably";
    return "Yep!";
}

export function getAnswerText(answer: SystemOneAnswer) {
    const { type } = answer;
    switch (type) {
        case "noul":
            return getNoulText(answer.noul);
        case "choice": {
            const { choice, confidence = 0 } = answer as SystemOneChoiceAnswer;
            return `${getCertaintyText(confidence)}, ${choice}`;
        }
        default:
            return "Not implementing the score yet";
    }
}

export function displayAnswer(
    question: SystemOneQuestion,
    answer: SystemOneAnswer,
) {
    const { instructions } = question;
    const { type } = answer;
    if (type === "noul") {
        console.log(`${instructions}\t${getNoulText(answer.noul)}`);
        return;
    }
    const text = getCertaintyText(answer.confidence);
    if (type === "choice") {
        console.log(`${instructions}\t${text}, ${answer.choice}`);
        return;
    }
    console.log(instructions, answer);
}

export function defaultDisplayAnswers(
    req: SystemOneRequest,
    res: SystemOneResponse,
) {
    const entries = Object.entries(req.questions);
    entries.forEach(([key, question]) => {
        const answer = res.answers[key];
        if (!answer) return;
        displayAnswer(question, answer);
    });
}

// export function defaultDisplayAnswers(
//     request: SystemOneRequest,
//     response: SystemOneResponse,
// ) {
//     console.log(request.state);

//     const entries = Object.entries(request.questions);
//     entries.forEach(([key, questn]) => {
//         const answer = response.answers[key];
//         if (!answer) return;
//         const text = getAnswerText(answer);
//         console.log(`${questn.instructions}\t${text}`);
//     });
// }
