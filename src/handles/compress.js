import node from "../helpers/node.js";
import { invalidInputError, isExisting, isFile, operationFailedError } from '../helpers/helpers.js';

const compress = async(args) => {
  if (!args.length) throw new Error(invalidInputError`missing mandatory path to file`);
  if (args.length === 1) throw new Error(invalidInputError`missing mandatory path to directory`);
  const pathToFile = node.resolve(args[0]);
  const isExistFile = await isExisting(pathToFile);
  const isFileForCompress = await isFile(pathToFile);
  if (!isExistFile || !isFileForCompress) {
    throw new Error(invalidInputError`no such file exists` + `: ${pathToFile}`);
  }
  const { base } = node.parse(pathToFile);
  const isExistDirectory = await isExisting(node.resolve(args[1]));
  const isDirectory = await isFile(node.resolve(args[1]));
  if (!(isExistDirectory) || isDirectory) {
    throw new Error(invalidInputError`no such directory exists` + `: ${node.resolve(args[1])}`);
  }
  const pathToCompressFile = node.resolve(args[1], `${base}.br`);
  const isAlreadyExistFile = await isExisting(pathToCompressFile);
  if (isAlreadyExistFile) {
    throw new Error(invalidInputError`such file already exists`);
  }
  try {
    const rs = node.createReadStream(pathToFile);
    const ws = node.createWriteStream(pathToCompressFile);
    const brotliCompress = node.createBrotliCompress();
    node.pipeline(rs, brotliCompress, ws);
  } catch (error) {
    throw new Error(operationFailedError`operation is wrong`);
  }
};

export { compress };
