import React, { useRef, useState } from 'react';

export default function SaveForm({handleGetSavedFiles, handleSave, handleDelete}) {
  const [savedFiles, setSavedFiles] = useState(handleGetSavedFiles());
  const inputRef = useRef();

  const confirmOverwrite = (name) => {
    if (confirm(`Overwrite ${name}?`)) {
      handleSave(name);
    }
  }

  const handleNewSaveSubmit = (event) => {
    event.preventDefault();
    // @ts-ignore
    handleSave(inputRef.current.value);
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

    const list = savedFiles.map((file: {name: string, date: string}, key: number) => {
      return (
        <p key={key}>
          <a onClick={(event) => { event.preventDefault(); confirmOverwrite(file.name); }}><strong>{file.name}</strong> <small>({file.date})</small></a>
          <a onClick={(event) => { event.preventDefault(); confirmDelete(file.name); }}>[delete]</a>
        </p>
      );
    })

    return (
      <nav>{list}</nav>
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
