import node from "../helpers/node.js";
import { invalidInputError, operationFailedError } from '../helpers/helpers.js';

const add = async (args) => {
  if (!args.length) throw new Error(invalidInputError`missing mandatory file name`);
  let fileDescriptor = null;
  try {
    const pathToFile = node.resolve(node.cwd(), args[0]);
    fileDescriptor = await node.fsp.open(pathToFile, 'w');
  } catch (error) {
    throw new Error(operationFailedError`add operation is wrong`);
  } finally {
    fileDescriptor?.close();
  }
};

export { add };
