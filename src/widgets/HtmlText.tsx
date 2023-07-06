import React, { useContext, useEffect, useRef } from 'react';
import sanitizeHtml from 'sanitize-html';
import { IOptions } from 'sanitize-html';
import { HandleInputType } from '../types';
import GameContext from '../GameContext';

const sanitizeOptions: IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  disallowedTagsMode: 'escape',
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: ['href', 'name', 'target', 'data-command'],
    '*': ['style', 'class', 'id']
  }
}

interface HtmlTextProps {
  text: string,
  handleInput?: HandleInputType,
  className?: string
}

export default function HtmlText({text, handleInput, className}: HtmlTextProps) {
  const context = useContext(GameContext);
  const htmlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = htmlRef.current;
    html?.querySelectorAll('a[data-command], button[data-command]').forEach((element) => {
      element.addEventListener('click', clickEvent);
    });
  });

  const clickEvent = function(this: HTMLElement, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    (handleInput || context.handleInput)(this.getAttribute('data-command') || '');
  }

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: sanitizeHtml(text, sanitizeOptions) }} ref={htmlRef}></div>
  );
}
