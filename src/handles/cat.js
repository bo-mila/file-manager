import node from "../helpers/node.js";
import { invalidInputError, operationFailedError } from '../helpers/helpers.js';

const cat = async (args) => {
  if (!args.length) throw new Error(invalidInputError`missing mandatory path to file`);
  try {
    const pathToFile = node.resolve(args[0]);
    const rs = node.createReadStream(pathToFile, { 'encoding': 'utf8' });
    for await (let chunk of rs) {
      node.stdout.write(chunk);
    }
  } catch (error) {
    throw new Error(operationFailedError`path is wrong`);
  }
};

export { cat };
