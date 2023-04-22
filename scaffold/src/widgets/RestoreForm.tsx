import React, { useState } from 'react';

export default function RestoreForm({getSaveNames, handleRestore, handleDelete}) {
  const [saveNames, setSaveNames] = useState(getSaveNames());

  const handleRestoreClick = (event) => {
    event.preventDefault();
    const name = event.target.innerText;
    if (confirm(`Discard unsaved changes and load ${name}?`)) {
      handleRestore(name);
    }
  }

  const confirmDelete = (name: string) => {
    if (confirm(`Delete ${name}?`)) {
      handleDelete(name);
      setSaveNames(getSaveNames());
    }
  }

  const renderSaves = () => {
    if (saveNames.length == 0) {
      return (
        <nav>
          <p>No saved games.</p>
        </nav>
      );
    }

    const list = saveNames.map((name, key) => {
      return (
        <p key={key}>
          <a onClick={handleRestoreClick}>{name}</a>
          <a onClick={(event) => { event.preventDefault(); confirmDelete(name); }}>[delete]</a>
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
