import node from './helpers/node.js';
import { handleInput, up, cd, ls, cat } from './handles/handles.js';
import { parseArgs } from './helpers/helpers.js';


const dispatcher = {
  'cat': (args) => cat(args),
  'up': () => up(),
  'cd': (args) => cd(args),
  'ls': () => ls(),
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
