import { promises } from "fs";
import path, { sep } from "path";

const copy = async (filePath, newDirPath, username) => {
  try {
    const absFilePath = path.normalize(path.resolve(filePath));
    const fileName = absFilePath.split(path.sep).pop();
    const absDirPath = `${path.normalize(
      path.resolve(newDirPath)
    )}${sep}${fileName}`;
    if (!absFilePath.includes(username) || !absDirPath.includes(username)) {
      throw new Error("Operation failed\n");
    } else {
      await promises.copyFile(absFilePath, absDirPath);
    }
  } catch (err) {
    console.log(err);
    process.stderr.write("Operation failed\n");
  }
};

export default copy;
