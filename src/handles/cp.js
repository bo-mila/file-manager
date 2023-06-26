import node from "../helpers/node.js";
import { invalidInputError, isExisting, operationFailedError } from '../helpers/helpers.js';

const cp = async (args) => {
  if (!args.length) throw new Error(invalidInputError`missing mandatory path to file`);
  if (args.length === 1) throw new Error(invalidInputError`missing mandatory path to directory`);
  const pathToFile = node.resolve(args[0]);
  if (!(await isExisting(pathToFile))) {
    throw new Error(invalidInputError`no such file exists` + `: ${pathToFile}`);
  }
  const { base } = node.parse(pathToFile);
  if (!(await isExisting(node.resolve(args[1])))) {
    throw new Error(invalidInputError`no such directory exists` + `: ${node.resolve(args[1])}`);
  }
  const pathToCopyFile = node.resolve(args[1], base);
  if (await isExisting(pathToCopyFile)) {
    throw new Error(invalidInputError`such file already exists`);
  }
  try {
    const rs = node.createReadStream(pathToFile);
    const ws = node.createWriteStream(pathToCopyFile);
    for await (const chunk of rs) {
      ws.write(chunk);
    }
  } catch (error) {
    throw new Error(operationFailedError`copy operation is wrong`);
  }
};

export { cp };
