import node from "./node.js";

const isFile = async (path) => {
  const res = await node.fsp.stat(path).then((data) => data.isFile()).catch(() => false);
  return res;
};

export { isFile };
