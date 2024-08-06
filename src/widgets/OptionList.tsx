import React from "react";
import CommandLink from "./CommandLink";
import { HandleInputType } from "../types";

interface OptionListProps {
  options: string[];
  handleInput?: HandleInputType;
  className?: string;
}

export default function OptionList({
  options,
  handleInput,
  className,
}: OptionListProps) {
  const renderOptions = () => {
    const linkOrSpan = (text: string) => {
      if (handleInput) {
        return (
          <CommandLink command={text} handleInput={handleInput}>
            {text}
          </CommandLink>
        );
      } else {
        return <span>{text}</span>;
      }
    };

    const listItems = options.map((opt: string, index: number) => {
      return <li key={index}>{linkOrSpan(opt)}</li>;
    });

    return (
      <div>
        <nav>
          <ol>{listItems}</ol>
        </nav>
      </div>
    );
  };

  return options?.length > 0 ? (
    <div className={className}>{renderOptions()}</div>
  ) : null;
}
