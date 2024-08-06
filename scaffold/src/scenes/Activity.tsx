import React from "react";
import { History, Turn, CommandForm, ScenePropsType } from "react-gamefic";

export default function Activity({
  output,
  history,
  handleInput,
}: ScenePropsType) {
  const commandHistory = [...history, output]
    .filter((output) => output.last_input)
    .reverse()
    .map((output) => output.last_input);

  return (
    <div>
      <History turns={history} />
      <Turn output={output} handleInput={handleInput} />
      <CommandForm
        prompt={output.prompt}
        handleInput={handleInput}
        history={commandHistory}
      />
    </div>
  );
}
