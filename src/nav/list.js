import { promises } from "fs";
import path from "path";

const list = async (dirPath, username) => {
  try {
    const absPath = path.resolve(dirPath);
    if (!absPath.includes(username)) {
      process.stderr.write(
        "You can't list files outside your root directory\n"
      );
      return;
    }
    return await promises.readdir(absPath, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") {
      process.stderr.write("Operation failed\n");
    }
  }
};

export default list;
