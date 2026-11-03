import type { SystemOneRequest, SystemOneResponse } from "ollama";

export interface Problem {
    getRequests: (model: string) => SystemOneRequest[];
    displayAnswers: (
        request: SystemOneRequest,
        response: SystemOneResponse,
    ) => void;
}
