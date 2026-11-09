# systemOne

node-based app for trialling system-one AI usage

## Ollama-based tests

Three problem sets for putting some of the local S1 models through their paces.

- Sally-Anne: a classical psychology test for theory-of-mind, originally administeed to small children to see if they can model another's behaviour.
- Socrates: a set of syllogisms to see how well the ANN can understand logical categories and correct generalisations.
- Syllogisms: an extension of Socrates, to test for logical gotchas (eg, Affirming the consequent)

This assumes that your system has Ollama installed. It also requires the node sdk, so run `npm i` to install the '`ollama` package.

To run the tests, use `npm run start`.

If you want to tweak the problems, run in dev mode: `npm run dev`. The tests will auto-run on file save. How fast they run depends on the model, and if the Ollama server has timed out since the last request. The `kev:0.8b-q8_0` model is very fast to load and run, but is not super accurate.

## Problems

Check out the `jevish/interfaces/ts` file to see how a Problem object should be structured. Rough overview, it exposes two methods: `getRequests` and `displayAnswers`. These return API-compatible structures based on the `ollama` types.

The `getRequests` function allows multiple calls to the model. Existing arguments apply different states to the same set of questions, since that makes most sense in these cases. If you want, you can vary the questions of course.

The `displayAnswers` function puts the rendering code next to the question definition code, making customisation easier.

## TODO:

- Call the live Jev endpoint, once I'm happy with the tests and once I have results from runs with the local model(s).
