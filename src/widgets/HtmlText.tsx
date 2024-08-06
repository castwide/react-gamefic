import React, { useContext, useEffect, useRef } from "react";
import sanitizeHtml from "sanitize-html";
import { IOptions } from "sanitize-html";
import { HandleInputType } from "../types";
import GameContext from "../GameContext";

const sanitizeOptions: IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "button"]),
  disallowedTagsMode: "escape",
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    "*": ["style", "class", "id", "data-*"],
  },
};

interface HtmlTextProps {
  text: string;
  handleInput?: HandleInputType;
  className?: string;
  linkCommands?: boolean;
}

export default function HtmlText({
  text,
  handleInput,
  className,
  linkCommands = true,
}: HtmlTextProps) {
  const context = useContext(GameContext);
  const htmlRef = useRef<HTMLDivElement>(null);

  const clickEvent = function (this: HTMLElement, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    (handleInput || context.handleInput)(
      this.getAttribute("data-command") || "",
    );
  };

  useEffect(() => {
    if (linkCommands) {
      const html = htmlRef.current;
      html
        ?.querySelectorAll("a[data-command], button[data-command]")
        .forEach((element) => {
          element.addEventListener("click", clickEvent);
        });
    }
  });

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(text, sanitizeOptions) }}
      ref={htmlRef}
    ></div>
  );
}
