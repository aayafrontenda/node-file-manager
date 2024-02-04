import { promises } from "fs";
import path from "path";

const rename = async (filePath, newFileName) => {
  const absPath = path.normalize(path.resolve(filePath));
  try {
    await promises.rename(absPath, newFileName);
  } catch (err) {
    if (err.code === "ENOENT") {
      process.stderr.write("Operation failed\n");
    }
  }
};

export default rename;
