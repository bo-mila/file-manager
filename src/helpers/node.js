const node = {};
const tools = ['util', 'path', 'buffer', 'os', 'v8', 'vm'];
const multi = ['child_process', 'worker_threads'];
const streams = ['stream', 'fs', 'crypto', 'zlib', 'readline'];
const async = ['perf_hooks', 'async_hooks', 'timers', 'timers/promises', 'events'];
const network = ['dns', 'net', 'tls', 'http', 'https', 'http2', 'dgram'];
const internals = [...tools, ...multi, ...streams, ...async, ...network];

for (const name of internals) node[name] = await import(`node:${name}`);
node.process = process;
node.fsp = node.fsp.promises;
node.timers.promises = node['timers/promises'];
Object.freeze(node);

export { node };
