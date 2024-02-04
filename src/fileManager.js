import { parseUsername } from "./cli/args.js";
import path from "path";
import url from "url";
import up from "./nav/up.js";
import cd from "./nav/cd.js";
import list from "./nav/list.js";

const __username = parseUsername();
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
process.chdir(__dirname);

process.stdout.write(`Welcome to the File Manager, ${__username}!\n`);
process.stdout.write(`You are currently in ${__dirname}\n`);
process.stdout.write(">> ");

process.on("SIGINT", () => {
  process.exit(0);
});

process.stdin.on("data", async (chunk) => {
  const command = chunk.toString().trim();
  if (command === ".exit") {
    process.exit(0);
  } else if (command === "up") {
    await up(__username);
  } else if (command.includes("cd") && command.split(" ").length === 2) {
    const newDir = command.split(" ")[1];
    await cd(newDir, __username);
  } else if (
    command === "ls" ||
    (command.includes("ls") &&
      (command.split(" ").length === 2 || command.split(" ").length === 1))
  ) {
    const dirPath =
      command.split(" ").length === 2 ? command.split(" ")[1] : process.cwd();
    const content = await list(dirPath, __username);
    console.table(
      content.map((x) => {
        return {
          Name: x.name,
          Type: x.isFile() ? "file" : "directory",
        };
      })
    );
  } else {
    process.stderr.write(`Invalid input\n`);
  }
  process.stdout.write(`You are currently in ${process.cwd()}\n`);
  process.stdout.write(">> ");
});

process.on("exit", () => {
  if (process.exitCode === 0) {
    process.stdout.write(
      `Thank you for using File Manager, ${__username}, goodbye!\n`
    );
  }
});
