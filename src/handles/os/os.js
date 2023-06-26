import { eol, cpus, homedir, username, arch } from './osHandlers.js';
import { invalidInputError, operationFailedError } from '../../helpers/helpers.js';

const os = async(args) => {
  const dispatcher = {
    '--EOL': () => eol(),
    '--cpus': () => cpus(),
    '--homedir': () => homedir(),
    '--username': () => username(),
    '--architecture': () => arch(),
  };
  if (!args.length) throw new Error(invalidInputError`missing mandatory argument`);
  if (!(args[0] in dispatcher)) throw new Error(invalidInputError`such argument is not specified`);
  try {
    console.table(dispatcher[args[0]]());
  } catch(error) {
    throw new Error(operationFailedError`operation is wrong`);
  }
};

export { os };
