import node from "../helpers/node.js";
import { invalidInputError, isExisting, isFile, operationFailedError } from '../helpers/helpers.js';

const cp = async (args, remove = false) => {
  if (!args.length) throw new Error(invalidInputError`missing mandatory path to file`);
  if (args.length === 1) throw new Error(invalidInputError`missing mandatory path to directory`);
  const pathToFile = node.resolve(args[0]);
  if (!(await isExisting(pathToFile)) || !(await isFile(pathToFile))) {
    throw new Error(invalidInputError`no such file exists` + `: ${pathToFile}`);
  }
  const { base } = node.parse(pathToFile);
  if (!(await isExisting(node.resolve(args[1]))) || await isFile(node.resolve(args[1]))) {
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
    if (remove) await node.fsp.unlink(pathToFile);
  } catch (error) {
    throw new Error(operationFailedError`operation is wrong`);
  }
};

export { cp };
