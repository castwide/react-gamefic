const create = require("./create");
const fs = require("fs");
const path = require("path");

let directory;
let options;

beforeAll(async () => {
  directory = fs.mkdtempSync("react-gamefic-test");

  options = {
    name: "react-gamefic-test-project",
    directory: directory,
    paths: ["../lib"],
    className: "GAMEFIC_PLOT_CLASS",
  };

  await create(options);
});

afterAll(() => {
  fs.rmSync(directory, { recursive: true, force: true });
});

describe("create", () => {
  it("configures webpack", () => {
    const webpack = fs
      .readFileSync(path.join(directory, "webpack.config.cjs"))
      .toString();
    expect(webpack.includes('"../lib"')).toBeTruthy();
  });

  it("configures index.html", () => {
    const index = fs
      .readFileSync(path.join(directory, "public", "index.html"))
      .toString();
    expect(index.includes("React Gamefic Test Project")).toBeTruthy();
  });

  it("configures manifest.json", () => {
    const manifest = fs
      .readFileSync(path.join(directory, "public", "manifest.json"))
      .toString();
    expect(manifest.includes(options.name)).toBeTruthy();
  });

  it("configures package.json", () => {
    const pack = fs
      .readFileSync(path.join(directory, "package.json"))
      .toString();
    expect(pack.includes(`"name": "${options.name}"`)).toBeTruthy();
    expect(pack.includes("react-gamefic")).toBeTruthy();
    expect(pack.includes("gamefic-driver")).toBeTruthy();
  });

  it("configures index.tsx", () => {
    const index = fs
      .readFileSync(path.join(directory, "src", "index.tsx"))
      .toString();
    expect(index.includes("React Gamefic Test Project")).toBeTruthy();
  });

  it("configures driver.tsx", () => {
    const driver = fs
      .readFileSync(path.join(directory, "src", "driver.tsx"))
      .toString();
    expect(driver.includes('"GAMEFIC_PLOT_CLASS"')).toBeTruthy();
  });
});
