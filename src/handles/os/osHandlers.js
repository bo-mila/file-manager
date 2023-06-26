import node from '../../helpers/node.js';

const eol = () => JSON.stringify(node.EOL);

const cpus = () => node.cpus().map(({ model, speed }) => ({ model, speed: `${speed / 1000}GHz`}));

const homedir = () => {
  const { homedir } = node.userInfo();
  return homedir;
};

const username = () => {
  const { username } = node.userInfo();
  return username;
};

const arch = () => node.arch;

export { eol, cpus, homedir, username, arch };
