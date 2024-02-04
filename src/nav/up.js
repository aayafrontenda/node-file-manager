import fs from "fs";
import { sep } from "path";

const up = async (username) => {
  try {
    const path = process.cwd();
    const dirs = path.split(sep);
    if (!dirs[dirs.length - 1].includes(username)) {
      process.chdir(path + "/..");
    } else {
      process.stderr.write("You are already in your root directory\n");
    }
  } catch (error) {
    process.stderr.write(`Operation failed\n`);
  }
};

export default up;
