const fse = require('fs-extra')
const path = require('path');
const klawSync = require('klaw-sync');
const spawnSync = require('child_process').spawnSync;

const dependencies = ["gamefic-driver", "react", "react-dom", "react-gamefic", "react-modal"];
const devDependencies = [
  "@babel/core", "@babel/plugin-transform-modules-commonjs", "@babel/preset-env", "@types/react",
  "babel-loader", "babel-preset-react-app", "copy-webpack-plugin", "css-loader", "file-loader",
  "opal-webpack-bundler", "style-loader", "url-loader", "webpack", "webpack-cli", "webpack-dev-server"
];

function existingFiles(scaffold, target) {
  const available = klawSync(scaffold, { nodir: true }).map(obj => obj.path.substring(scaffold.length));
  const existing = available.filter((path) => fse.pathExistsSync(target + path));
  return {
    found: existing,
    total: available.length
  }
}

async function copyScaffold(scaffold, target) {
  return fse.copy(scaffold, target, {
    overwrite: false
  });
}

async function updateFiles(target, options) {
  ['package.json', 'public/index.html', 'public/manifest.json', 'src/widgets/Menu.tsx'].forEach((file) => {
    const filePath = path.join(target, file);
    const buffer = fse.readFileSync(filePath, 'utf-8').replace('%(name)', options.name);
    fse.writeFileSync(filePath, buffer);
  })
}

module.exports = async function create(options) {
  const scaffold = path.resolve(__dirname, '../../scaffold');
  const target = path.resolve(process.cwd(), options.directory);
  existing = existingFiles(scaffold, target);
  if (existing.found.length == existing.total) {
    console.log(`All project files already exist in ${target}.`)
  } else  {
    if (existing.found.length > 0) {
      console.log(`The following files already exist and will not be overwritten:\n  ${existing.found.join("\n  ")}`)
    }
    console.log('Copying project files...');
    await copyScaffold(scaffold, target);
    console.log('Updating files...');
    updateFiles(target, options);
    console.log('Installing dependencies...');
    spawnSync('npm', ['install', '--save-dev', ...devDependencies], { shell: true, stdio: 'inherit' });
    spawnSync('npm', ['install', '--save', ...dependencies], { shell: true, stdio: 'inherit' });
    console.log('Done.');
  }
  return true;
}
