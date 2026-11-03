import ollama, {
    type SystemOneAnswer,
    type SystemOneQuestion,
    type SystemOneRequest,
    type SystemOneResponse,
} from "ollama";
import { getCertaintyText, getNoulText } from "./displayers.js";

function displayAnswer(question: SystemOneQuestion, answer: SystemOneAnswer) {
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

function displayAnswers(req: SystemOneRequest, res: SystemOneResponse) {
    const entries = Object.entries(req.questions);
    entries.forEach(([key, question]) => {
        const answer = res.answers[key];
        if (!answer) return;
        displayAnswer(question, answer);
        // // console.log(val);
        // // console.log(answer);
        // console.log(`${question.instructions}\t${answer.noul}`);
    });
}

export async function runRequestsS1(reqs: SystemOneRequest[]) {
    for (const req of reqs) {
        // console.log(req);
        const res = await ollama.systemone(req);
        displayAnswers(req, res);
        console.log("----");
    }
}
