import node from './node.js';

const showWorkingDirectory = () => {
  node.stdout.write(`\nYou are currently in ${node.cwd()}\n`);
};

export { showWorkingDirectory };
