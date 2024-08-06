import React, { useState } from "react";
import { SaveFileType } from "../types";
import modalConfirm from "./modalConfirm";

interface RestoreFormProps {
  handleGetSavedFiles: () => SaveFileType[];
  handleRestore: (name: string) => void;
  handleDelete: (name: string) => void;
}

export default function RestoreForm({
  handleGetSavedFiles,
  handleRestore,
  handleDelete,
}: RestoreFormProps) {
  const [savedFiles, setSavedFiles] = useState(handleGetSavedFiles());

  const confirmRestore = async (name: string) => {
    if (await modalConfirm(`Discard unsaved changes and restore ${name}?`)) {
      handleRestore(name);
    }
  };

  const confirmDelete = async (name: string) => {
    if (await modalConfirm(`Delete ${name}?`)) {
      handleDelete(name);
      setSavedFiles(handleGetSavedFiles());
    }
  };

  const renderSaves = () => {
    if (savedFiles.length == 0) {
      return (
        <nav>
          <p>No saved games.</p>
        </nav>
      );
    }

    const list = savedFiles.map((file: SaveFileType, key: number) => {
      return (
        <li key={key}>
          <button
            onClick={(event) => {
              event.preventDefault();
              confirmRestore(file.name);
            }}
          >
            <strong>{file.name}</strong> <small>({file.date})</small>
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              confirmDelete(file.name);
            }}
          >
            [delete]
          </button>
        </li>
      );
    });

    return (
      <nav>
        <ol>{list}</ol>
      </nav>
    );
  };

  return <>{renderSaves()}</>;
}
