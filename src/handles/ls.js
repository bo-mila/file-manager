import node from "../helpers/node.js";
import { operationFailedError } from '../helpers/helpers.js';

const ls = async () => {
  try {
    const workingDirectory = node.resolve(node.cwd());
    const directoryContent = await node.fsp.readdir(workingDirectory, { withFileTypes: true });
    const folders = directoryContent.filter(content => !content.isFile())
      .sort()
      .map(content => ({ ['Name']: content.name, ['Type']: 'directory' }));
    const files = directoryContent.filter(content => content.isFile())
      .sort()
      .map(content => ({ ['Name']: content.name, ['Type']: 'file' }));
  
    console.table([...folders, ...files], ['Name', 'Type']);
  } catch(error) {
    node.stdout.write(operationFailedError`ls operation is wrong`)
  }
};

export { ls };
