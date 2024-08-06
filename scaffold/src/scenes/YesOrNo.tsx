import React from "react";
import { History, Turn, CommandForm, ScenePropsType } from "react-gamefic";

export default function YesOrNo({
  output,
  history,
  handleInput,
}: ScenePropsType) {
  return (
    <div>
      <History turns={history} />
      <Turn output={output} handleInput={handleInput} />
      <CommandForm prompt={output.prompt} handleInput={handleInput} />
    </div>
  );
}
