import node from "../helpers/node.js";
import { invalidInputError, isExisting, isFile, operationFailedError } from '../helpers/helpers.js';
const { Transform } = node.stream;

const hash = async (args) => {
  if (!args.length) throw new Error(invalidInputError`missing mandatory path to file`);
  const pathToFile = node.resolve(args[0]);
  if (!(await isExisting(pathToFile)) || !(await isFile(pathToFile))) {
    throw new Error(invalidInputError`no such file exists` + `: ${pathToFile}`);
  }
  try {
    const transform = new Transform({
      transform(chunk, _, callback) {
        callback(null, chunk.toString() + '\n');
      },
    });
    node.createReadStream(pathToFile)
      .pipe(node.createHash('sha256'))
      .setEncoding('hex')
      .pipe(transform)
      .pipe(node.stdout);
  } catch (error) {
    throw new Error(operationFailedError`operation is wrong`);
  }
};

export { hash };
