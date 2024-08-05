const {cli} = require('./cli');
const fs = require('fs');

let directory;

beforeAll(() => {
  directory = fs.mkdtempSync('react-gamefic-test');
});

afterAll(() => {
  fs.rmSync(directory, {recursive: true, force: true});
});

describe('cli', () => {
  it('outputs the version', async () => {
    const log = console.log;
    console.log = jest.fn();
    const logSpy = jest.spyOn(console, 'log');
    await cli([null, null, '--version']);
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/\d+\.\d+\.\d+/));
    console.log = log;
  });

  it('creates a project', async () => {
    await cli([null, null, directory]);
    const contents = fs.readdirSync(directory);
    expect(contents.length).toBeGreaterThan(0);
  });
});
