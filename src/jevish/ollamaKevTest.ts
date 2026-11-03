import { runRequestsS1 } from "./ollamaRunners.js";

import getRequest1 from "./problem01WhereIsTheCat.js";
import getRequest2 from "./problem02Socrates.js";
import syllogisms from "./problem03Syllogisms.js";

const kevRequests = [
    getRequest1("kev:0.8b-q8_0"),
    getRequest2("kev:0.8b-q8_0"),
    ...syllogisms.getRequests("kev:0.8b-q8_0"),
];

runRequestsS1(kevRequests);
