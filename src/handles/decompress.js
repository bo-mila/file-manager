import node from "../helpers/node.js";
import { invalidInputError, isExisting, isFile, operationFailedError } from '../helpers/helpers.js';

const decompress = async(args) => {
  if (!args.length) throw new Error(invalidInputError`missing mandatory path to file`);
  if (args.length === 1) throw new Error(invalidInputError`missing mandatory path to directory`);
  const pathToFile = node.resolve(args[0]);
  const isExistFile = await isExisting(pathToFile);
  const isFileForDecompress = await isFile(pathToFile);
  const isCompressedFile = node.parse(pathToFile).ext === '.br';
  if (!isExistFile || !isFileForDecompress || !isCompressedFile) {
    throw new Error(invalidInputError`invalid file for decompression` + `: ${pathToFile}`);
  }
  const { base } = node.parse(pathToFile);
  const isExistDirectory = await isExisting(node.resolve(args[1]));
  const isDirectory = await isFile(node.resolve(args[1]));
  if (!(isExistDirectory) || isDirectory) {
    throw new Error(invalidInputError`no such directory exists` + `: ${node.resolve(args[1])}`);
  }
  const pathToDecompressFile = node.resolve(args[1], node.parse(pathToFile).name);
  const isAlreadyExistFile = await isExisting(pathToDecompressFile);
  if (isAlreadyExistFile) {
    throw new Error(invalidInputError`such file already exists`);
  }
  try {
    const rs = node.createReadStream(pathToFile);
    const ws = node.createWriteStream(pathToDecompressFile);
    const brotliDecompress = node.createBrotliDecompress();
    node.pipeline(rs, brotliDecompress, ws);
  } catch (error) {
    throw new Error(operationFailedError`operation is wrong`);
  }
};

export { decompress };
