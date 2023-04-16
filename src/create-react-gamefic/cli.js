import arg from 'arg';
const create = require('./create');

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--name': String,
      '-n': '--name',
    },
    {
      argv: rawArgs.slice(2)
    }
  )
  return {
    name: args['--name'] || 'react-gamefic',
    directory: args._[0] || '.'
  };
}

export async function cli(args) {
  const options = parseArgumentsIntoOptions(args);
  await create(options);
 }
