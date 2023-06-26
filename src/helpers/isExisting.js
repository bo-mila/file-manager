import node from "./node.js";

const isExisting = async (path) => {
  const res = await node.fsp.stat(path).then(() => true).catch(() => false);
  return res;
};

export { isExisting };
