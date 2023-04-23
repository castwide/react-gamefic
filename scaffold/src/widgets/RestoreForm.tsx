import React, { useState } from 'react';

export default function RestoreForm({getSavedFiles, handleRestore, handleDelete}) {
  const [savedFiles, setSavedFiles] = useState(getSavedFiles());

  const confirmRestore = (name) => {
    if (confirm(`Discard unsaved changes and load ${name}?`)) {
      handleRestore(name);
    }
  }

  const confirmDelete = (name: string) => {
    if (confirm(`Delete ${name}?`)) {
      handleDelete(name);
      setSavedFiles(getSavedFiles());
    }
  }

  const renderSaves = () => {
    if (savedFiles.length == 0) {
      return (
        <nav>
          <p>No saved games.</p>
        </nav>
      );
    }

    const list = savedFiles.map((file, key) => {
      return (
        <p key={key}>
          <a onClick={(event => { event.preventDefault(); confirmRestore(file.name); })}><strong>{file.name}</strong> <small>({file.date}}</small></a>
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
    </>
  )
}
