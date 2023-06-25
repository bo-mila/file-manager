import node from "../helpers/node.js";
import { invalidInputError, operationFailedError } from '../helpers/helpers.js';

const rn = async (args) => {
  console.log(args);
  if (!args.length) throw new Error(invalidInputError`missing mandatory file name`);
  if (args.length === 1) throw new Error(invalidInputError`missing mandatory new file name`);
  try {
    const pathFromFile = node.resolve(args[0].toString());
    const { dir } = node.parse(pathFromFile);
    const pathToFile = node.resolve(dir, args[1].toString());
    await node.fsp.rename(pathFromFile, pathToFile);
  } catch (error) {
    throw new Error(operationFailedError`rename operation is wrong`);
  }
};

export { rn };
