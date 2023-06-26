import { cp } from "./cp.js";

const mv = async (args) => await cp(args, true);

export { mv };
