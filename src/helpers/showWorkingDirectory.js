import node from './node.js';

const showWorkingDirectory = () => {
  node.stdout.write(`You are currently in ${node.cwd()}\n`);
};

export { showWorkingDirectory };
