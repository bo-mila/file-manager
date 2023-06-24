import { parseArgs } from "./parseArgs.js";
console.log(parseArgs(['', '', '--us=2']).getArgs);
export { parseArgs };
