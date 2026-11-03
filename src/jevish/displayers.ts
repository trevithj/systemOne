import type { SystemOneAnswer, SystemOneChoiceAnswer } from "ollama";

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
