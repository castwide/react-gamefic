import "@testing-library/jest-dom";
import saveTranscript from './saveTranscript';

// @todo Apparently not available in testing-library
window.requestIdleCallback = (callback: any) => { return callback };

describe("saveTranscript()", () => {
  it("renders a transcript", () => {
    const div = saveTranscript([]);
    expect(div).toBeInstanceOf(HTMLDivElement);
  });
});
