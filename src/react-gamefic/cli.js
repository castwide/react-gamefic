import arg from "arg";
const create = require("./create");

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--version": Boolean,
      "--name": String,
      "-n": "--name",
      "--class": String,
      "-c": "--class",
      "--path": [String],
      "-p": "--path",
    },
    {
      argv: rawArgs.slice(2),
    },
  );
  return {
    version: args["--version"],
    name: args["--name"] || "react-gamefic",
    className: args["--class"] || "GAMEFIC_PLOT_CLASS",
    paths: args["--path"] || [],
    directory: args._[0] || ".",
  };
}

function outputVersion() {
  const pjson = require("../../package.json");
  console.log(pjson.version);
}

export async function cli(args) {
  const options = parseArgumentsIntoOptions(args);
  if (options.version) {
    outputVersion();
  } else {
    await create(options);
  }
}
