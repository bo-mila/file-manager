import node from "../helpers/node.js";
import { operationFailedError } from "../helpers/helpers.js";

const up = () => {
  try {
    node.chdir('..');
  } catch(error) {
    throw new Error(operationFailedError`operation up is wrong`);
  }
};

export { up };
