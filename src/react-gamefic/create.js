const fse = require("fs-extra");
const path = require("path");
const klawSync = require("klaw-sync");
const spawnSync = require("child_process").spawnSync;

const dependencies = ["gamefic-driver", "react", "react-dom", "react-gamefic"];

const devDependencies = [
  "@babel/core",
  "@babel/plugin-transform-modules-commonjs",
  "@babel/preset-react",
  "@babel/preset-typescript",
  "@babel/preset-env",
  "@types/react",
  "@types/react-dom",
  "babel-loader",
  "copy-webpack-plugin",
  "css-loader",
  "file-loader",
  "opal-webpack-bundler",
  "style-loader",
  "url-loader",
  "webpack",
  "webpack-cli",
  "webpack-dev-server",
];

function existingFiles(scaffold, target) {
  const available = klawSync(scaffold, { nodir: true }).map((obj) =>
    obj.path.substring(scaffold.length),
  );
  const existing = available.filter((path) =>
    fse.pathExistsSync(target + path),
  );
  return {
    found: existing,
    total: available.length,
  };
}

async function copyScaffold(scaffold, target) {
  return fse.copy(scaffold, target, {
    overwrite: false,
  });
}

function encodePaths(paths) {
  const encoded = paths.map((path) => {
    return `path.resolve(__dirname, ${JSON.stringify(path)})`;
  });
  encoded.unshift(`path.resolve(__dirname, "../")`);
  return `[${encoded.join(", ")}]`;
}

const updateableFiles = [
  "package.json",
  "public/index.html",
  "public/manifest.json",
  "src/driver.tsx",
  "src/index.tsx",
  "src/opal.rb",
  "webpack.config.cjs",
];

function titleCase(str) {
  return str
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

async function updateFiles(target, options) {
  updateableFiles.forEach((file) => {
    const filePath = path.join(target, file);
    const buffer = fse
      .readFileSync(filePath, "utf-8")
      .replace("%(name)", options.name)
      .replace("%(title)", titleCase(options.name))
      .replace("%(className)", options.className)
      .replace("%(paths)", encodePaths(options.paths));
    fse.writeFileSync(filePath, buffer);
  });
}

module.exports = async function create(options) {
  const scaffold = path.resolve(__dirname, "../../scaffold");
  const target = path.resolve(process.cwd(), options.directory);
  const existing = existingFiles(scaffold, target);
  console.log(`Creating react-gamefic project in ${target}...`);
  if (existing.found.length == existing.total) {
    console.log(`All project files already exist in ${target}.`);
  } else {
    if (existing.found.length > 0) {
      console.log(
        `The following files already exist and will not be overwritten:\n  ${existing.found.join("\n  ")}`,
      );
    }
    console.log("Copying project files...");
    await copyScaffold(scaffold, target);
    console.log("Updating files...");
    await updateFiles(target, options);
    console.log("Installing dependencies...");
    spawnSync("npm", ["install", "--save-dev", ...devDependencies], {
      shell: true,
      stdio: "inherit",
      cwd: target,
    });
    spawnSync("npm", ["install", "--save", ...dependencies], {
      shell: true,
      stdio: "inherit",
      cwd: target,
    });
    console.log("Done.");
  }
  return true;
};
