import React, { useRef, useState } from 'react';
import { SaveFileType } from '../types';

interface SaveFormProps {
  handleGetSavedFiles: () => SaveFileType[],
  handleSave: (name: string) => void,
  handleDelete: (name: string) => void
}

export default function SaveForm({handleGetSavedFiles, handleSave, handleDelete}: SaveFormProps) {
  const [savedFiles, setSavedFiles] = useState(handleGetSavedFiles());
  const inputRef = useRef<HTMLInputElement>(null);

  const confirmOverwrite = (name: string) => {
    if (confirm(`Overwrite ${name}?`)) {
      handleSave(name);
    }
  }

  const handleNewSaveSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSave(inputRef.current?.value || '(unnamed)');
  }

  const confirmDelete = (name: string) => {
    if (confirm(`Delete ${name}?`)) {
      handleDelete(name);
      setSavedFiles(handleGetSavedFiles());
    }
  }

  const renderSaves = () => {
    if (savedFiles.length == 0) return (
      <nav>
        <p>No saved games.</p>
      </nav>
    );

    const list = savedFiles.map((file, key) => {
      return (
        <li key={key}>
          <button onClick={(event) => { event.preventDefault(); confirmOverwrite(file.name); }}><strong>{file.name}</strong> <small>({file.date})</small></button>
          <button onClick={(event) => { event.preventDefault(); confirmDelete(file.name); }}>[delete]</button>
        </li>
      );
    })

    return (
      <nav><ol>{list}</ol></nav>
    );
  };

  return (
    <>
      {renderSaves()}
      <form onSubmit={handleNewSaveSubmit}>
        <input type="text" placeholder="New File Name" ref={inputRef} />
        <button type="submit">Save</button>
      </form>
    </>
  )
}
