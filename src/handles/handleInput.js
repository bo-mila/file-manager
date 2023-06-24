import { invalidInputError } from '../helpers/helpers.js';

const handleInput = (operationMap, input) => {
  try {
    let [operation, ...args] = input.toString().trim().split(' ');
    args = args.filter(arg => arg !== '');
    if (operation in operationMap || args.length !== 0) {
      operationMap[operation](args);
    } else {
      throw new Error(invalidInputError`unknown operation`);
    }
  } catch(error) {
    console.error(error.message);
  }
};

export { handleInput };
