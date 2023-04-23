import React, { useEffect, useRef, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import { IOptions } from 'sanitize-html';

const sanitizeOptions: IOptions = {
  disallowedTagsMode: 'escape',
  allowedAttributes: {...sanitizeHtml.defaults.allowedAttributes, a: ['href', 'name', 'target', 'data-command']}
}

export default function HtmlText({text, handleInput = null, className=''}: any) {
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
    handleInput?.call(null, this.getAttribute('data-command'));
  }

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: sanitizeHtml(text, sanitizeOptions) }} ref={htmlRef}></div>
  );
}