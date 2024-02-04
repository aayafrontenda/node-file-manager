import fs from "fs";
import path from "path";

const read = async (filePath, username) => {
  let content = "";
  return new Promise((resolve, reject) => {
    try {
      console.log(filePath);
      const absPath = path.resolve(filePath);
      if (!filePath.includes(username)) {
        throw new Error("Operation failed\n");
      }
      const rs = fs.createReadStream(absPath);
      rs.on("data", (chunk) => {
        content += chunk;
      });
      rs.on("end", () => {
        resolve(content);
      });
    } catch (err) {
      reject(err);
      process.stderr.write("Operation failed\n");
    }
  });
};

export default read;
