const node = {};
const tools = ['util', 'path', 'buffer', 'os', 'v8', 'vm'];
const multi = ['child_process', 'worker_threads'];
const streams = ['stream', 'fs', 'crypto', 'zlib', 'readline'];
const async = ['perf_hooks', 'async_hooks', 'timers', 'timers/promises', 'events'];
const network = ['dns', 'net', 'tls', 'http', 'https', 'http2', 'dgram'];
const url = ['url'];
const internals = [...tools, ...multi, ...streams, ...async, ...network, ...url];

for (const name of internals) node[name] = await import(`node:${name}`);
node.process = process;
node.chdir = node.process.chdir;
node.nextTick = node.process.nextTick;
node.exit = node.process.exit;
node.argv = node.process.argv;
node.stdin = node.process.stdin;
node.cwd = node.process.cwd;
node.stdout = node.process.stdout;
node.homedir = node.os.homedir;
node.fileURLToPath = node.url.fileURLToPath;
node.fsp = node.fs.promises;
Object.freeze(node);

export default node;
