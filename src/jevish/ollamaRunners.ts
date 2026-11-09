import ollama, { type SystemOneRequest } from "ollama";
import type { DisplayFn, Problem } from "./interfaces.js";

export async function runRequestsS1(
    reqs: SystemOneRequest[],
    displayAnswers: DisplayFn,
): Promise<void> {
    for (const req of reqs) {
        // console.log(req);
        const res = await ollama.systemone(req);
        displayAnswers(req, res);
        console.log("----");
    }
}

export async function runProblemsS1(model: string, prob: Problem) {
    await runRequestsS1(prob.getRequests(model), prob.displayAnswers);
}
