import node from '../helpers/node.js';
import { invalidInputError, operationFailedError } from '../helpers/helpers.js';

const cd = (args) => {
  if (!args.length) throw new Error(invalidInputError`missing mandatory path`) ;
  try {
    node.chdir(args[0]);
  } catch(error) {
    throw new Error(operationFailedError`path is wrong`);
  }
};

export { cd };
