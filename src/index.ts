import { runProblemsS1 } from "./jevish/ollamaRunners.js";

import sallyAnne from "./jevish/problem01SallyAnne.js";
import socrates from "./jevish/problem02Socrates.js";
import syllogisms from "./jevish/problem03Syllogisms.js";

// const MODEL = "kev:0.8b-q8_0";
const MODEL = "tev1:4b";

console.log("Model: " + MODEL);

console.log("Sally-Anne test");
await runProblemsS1(MODEL, sallyAnne);

console.log("Socrates");
await runProblemsS1(MODEL, socrates);

console.log("Syllogisms");
await runProblemsS1(MODEL, syllogisms);
