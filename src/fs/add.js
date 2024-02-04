import { promises } from "fs";
import { sep } from "path";
const add = async (fileName) => {
  const filePath = `${process.cwd()}${sep}${fileName}`;
  try {
    await promises.access(filePath);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code === "ENOENT") {
      promises.appendFile(filePath, "");
    } else {
      process.stderr.write("Operation failed\n");
    }
  }
};

export default add;
