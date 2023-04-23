import React from "react";
import type SceneProps from "../src/SceneProps";
import CommandForm from '../src/widgets/CommandForm';

export default function TestScene ({output, history, handleInput}: SceneProps) {
  return (
      <div>
          <div data-testid="output">{JSON.stringify(output)}</div>
          <div data-testid="history">{JSON.stringify(history)}</div>
          <CommandForm prompt=">" handleInput={handleInput} />
      </div>
  )
}
