const parseArgs = (inputArguments) => {
  const argv = inputArguments.slice(2);
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    let [prop, value] = argv[i].split('=');
    args[prop] = value;
  }
  return {
    getArg: (prop) => prop in args ? args[prop] : false,
    getArgs: () => args,
    getArgsWithPrefix: (prefix) => {
      const argsWithPrefix = Object.keys(args).filter(key => key.startsWith(prefix));
      if (argsWithPrefix.length) {
        const res = {};
        argsWithPrefix.forEach(key => res[key] = args[key]);
        return res;
      }
      return;
    }
  }
};

export { parseArgs };
