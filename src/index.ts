import { greet } from "./greet.js";
import { runRequestsS1 } from "./jevish/ollamaRunners.js";

import getRequest1 from "./jevish/problem01WhereIsTheCat.js";
import getRequest2 from "./jevish/problem02Socrates.js";
import syllogisms from "./jevish/problem03Syllogisms.js";

console.log(greet("world"));

const kevRequests = [
    getRequest1("kev:0.8b-q8_0"),
    getRequest2("kev:0.8b-q8_0"),
    ...syllogisms.getRequests("kev:0.8b-q8_0"),
];

runRequestsS1(kevRequests);
