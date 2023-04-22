import React, { useRef, useState } from 'react';

export default function SaveForm({getSaveNames, handleSave, handleDelete}) {
  const [saveNames, setSaveNames] = useState(getSaveNames());
  const inputRef = useRef();

  const handleOverwriteClick = (event) => {
    event.preventDefault();
    const name = event.target.innerText;
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
      setSaveNames(getSaveNames());
    }
  }

  const renderSaves = () => {
    if (saveNames.length == 0) return (
      <nav>
        <p>No saved games.</p>
      </nav>
    );

    const list = saveNames.map((name: string, key: number) => {
      return (
        <p key={key}>
          <a onClick={handleOverwriteClick}>{name}</a>
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
      <form onSubmit={handleNewSaveSubmit}>
        <input type="text" placeholder="New File Name" ref={inputRef} />
        <button type="submit">Save</button>
      </form>
    </>
  )
}
