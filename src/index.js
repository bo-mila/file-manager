import { handleInput, up, cd } from './handles/handles.js';
import node from './helpers/node.js';
import { parseArgs, showWorkingDirectory } from './helpers/helpers.js';


const dispatcher = {
  'cat': (data) => console.log(data),
  'up': () => up(),
  'cd': (args) => cd(args),
}

try {
  node.chdir(node.homedir());
  const userName = parseArgs(node.argv).getArg('--username') || 'Anonymous';
  node.stdout.write(`Welcome to the File Manager, ${userName}!\n`);

  const rl = node.readline.createInterface(node.stdin, node.stdout);
  rl.on('line', (data) => {
    if (data.toString().startsWith('.exit')) rl.close();
    else {
      handleInput(dispatcher, data);
      showWorkingDirectory();
    }
  })
    .on('SIGINT', () => rl.close())
    .on('close', () => {
      node.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n`);
      node.nextTick(() => node.exit());
    });
} catch (error) {
  node.stdout.write(error.message);
}
