import node from "./node.js";

const getFileURLToPath = (importMetaUrl) => node.fileURLToPath(importMetaUrl);

export { getFileURLToPath };
