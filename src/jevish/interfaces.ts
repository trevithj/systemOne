import type { SystemOneRequest, SystemOneResponse } from "ollama";

export type DisplayFn = {
    // description: "Overridable means of displaying a request/response pair";
    (request: SystemOneRequest, response: SystemOneResponse): void;
};

export type GetRequestsFn = {
    // description: "Base creator of an array of valid system-one requests";
    (model: string): SystemOneRequest[];
};

export interface Problem {
    getRequests: GetRequestsFn;
    displayAnswers: DisplayFn;
}
