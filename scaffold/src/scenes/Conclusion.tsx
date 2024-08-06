import React from "react";
import { History, Turn, ScenePropsType } from "react-gamefic";

export default function Conclusion({ output, history }: ScenePropsType) {
  return (
    <div>
      <History turns={history} />
      <Turn output={output} />
    </div>
  );
}
