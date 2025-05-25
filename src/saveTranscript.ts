import { History } from "./widgets";
import { OutputType } from "./types";
import { htmlToText } from "html-to-text";
import renderTranscript from "./renderTranscript";

export default function saveTranscript(
  turns: OutputType[],
  component = History,
): HTMLDivElement {
  const div = renderTranscript(turns, component);
  requestIdleCallback(() => {
    const text = htmlToText(div.innerHTML);
    const link = document.createElement("a");
    const blob = new Blob([text], { type: "text/plain" });
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", "transcript.txt");
    link.click();
    return link;
  });
  return div;
}
