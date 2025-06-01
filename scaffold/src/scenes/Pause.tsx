import React, { useEffect } from "react";
import { History, Turn, CommandLink, ScenePropsType } from "react-gamefic";
import inDialog from "./inDialog";

export default function Pause({
  output,
  history,
  handleInput,
}: ScenePropsType) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (inDialog()) return;
      if (handleInput && event.code == "Enter") {
        event.preventDefault();
        handleInput("");
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  });

  return (
    <div>
      <History turns={history} />
      <Turn className="turn" output={output} />
      <CommandLink command="" handleInput={handleInput}>
        {output.prompt}
      </CommandLink>
    </div>
  );
}
