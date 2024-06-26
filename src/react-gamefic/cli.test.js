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
  it('creates a project', async () => {
    await cli([null, null, directory]);

    const contents = fs.readdirSync(directory);
    expect(contents.length).toBeGreaterThan(0);
  });
});
