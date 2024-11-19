import React from "react";
import { useEffect, useId, useRef } from "react";
import { HandleInputType } from "../types";

interface CommandFormProps {
  prompt: string;
  handleInput: HandleInputType;
  history?: Array<string | null>;
  className?: string;
}

export default function CommandForm({
  prompt,
  handleInput,
  history = [],
  className = "",
}: CommandFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  let index = -1;
  let currentInput = "";

  const commandFormInputId = useId();

  useEffect(() => {
    index = -1;
    currentInput = "";
    inputRef.current?.focus();
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleInput(inputRef.current?.value || "");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.code) {
      case "ArrowUp":
        moveIndex(1, event);
        break;
      case "ArrowDown":
        moveIndex(-1, event);
        break;
    }
  };

  const moveIndex = (change: number, event: React.KeyboardEvent) => {
    if (history.length > 0) {
      index += change;
      if (index < 0) {
        index = -1;
        if (inputRef.current) inputRef.current.value = currentInput;
      } else if (index >= history.length) {
        index = history.length - 1;
      } else {
        if (inputRef.current) {
          inputRef.current.value = history[index] || "";
          inputRef.current.selectionStart = inputRef.current.value.length;
          event.preventDefault();
        }
      }
    }
  };

  const handleChange = () => {
    if (index == -1) {
      currentInput = inputRef.current?.value || "";
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <label htmlFor={commandFormInputId}>{prompt}</label>
      <input
        id={commandFormInputId}
        type="text"
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      <button type="submit">Enter</button>
    </form>
  );
}
