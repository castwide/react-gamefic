import React, { useEffect, useRef } from 'react';
import { History, Turn, ScenePropsType } from 'react-gamefic';

export default function MultipleChoice({ output, history, handleInput }: ScenePropsType) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let button: HTMLElement | null = null;

    const handleKey = (event: KeyboardEvent) => {
      const buttons = sceneRef.current?.querySelectorAll<HTMLElement>('ol li button');
      if (event.key.match(/[1-9]/)) {
        const selected = parseInt(event.key);
        button?.blur();
        button = buttons?.item(selected - 1) || null;
        button?.focus();
      } else if (event.code == 'Escape') {
        buttons?.forEach((btn) => btn.blur());
      }
    }
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    }
  });

  return (
    <div ref={sceneRef}>
      <History turns={history} />
      <Turn output={output} handleInput={handleInput} />
    </div>
  );
}
