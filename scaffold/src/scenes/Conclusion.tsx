import React from "react";
import { History, Turn, ScenePropsType, CommandLink } from "react-gamefic";

export default function Conclusion({ output, history }: ScenePropsType) {
  return (
    <div>
      <History turns={history} />
      <Turn output={output} />
      <nav>
        <ul>
          <li>
            <CommandLink command="Undo">Undo the last action</CommandLink>
          </li>
          <li>
            <CommandLink command="Restore">Restore a saved game</CommandLink>
          </li>
          <li>
            <CommandLink command="Restart">Start a new game</CommandLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
