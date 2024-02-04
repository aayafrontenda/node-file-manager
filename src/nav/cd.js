import path from "path";
const cd = async (dirPath, username) => {
  try {
    const absPath = path.resolve(dirPath);

    if (absPath.includes(username)) {
      process.chdir(absPath);
    } else {
      process.stderr.write("You can't go above your root directory\n");
    }
  } catch (error) {
    process.stderr.write(`Operation failed\n`);
  }
};

export default cd;
