export const parseUsername = () => {
  const args = process.argv.slice(2).join("").split("=");
  return args[1];
};
