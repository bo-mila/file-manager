import node from "../helpers/node.js";
import { invalidInputError, isExisting, isFile, operationFailedError } from '../helpers/helpers.js';

const rm = async (args) => {
  if (!args.length) throw new Error(invalidInputError`missing mandatory path to file`);
  const pathToFile = node.resolve(args[0]);
  if (!(await isExisting(pathToFile)) || !(await isFile(pathToFile))) {
    throw new Error(invalidInputError`no such file exists` + `: ${pathToFile}`);
  }
  try {
    await node.fsp.unlink(pathToFile);
  } catch (error) {
    throw new Error(operationFailedError`operation is wrong`);
  }
};

export { rm };
