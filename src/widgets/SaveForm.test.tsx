import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act, render, screen, waitFor } from "@testing-library/react";
import SaveForm from "./SaveForm";

const user = userEvent.setup();

let response;

const handleGetSavedFiles = () => {
  return [
    {
      name: "filename",
      date: "date/time",
      timestamp: 1000,
    },
  ];
};

const deleteOrSave = (name: string) => {
  response = name;
};

beforeEach(() => {
  response = null;
});

describe("<SaveForm />", () => {
  it("overwrites", async () => {
    render(
      <SaveForm
        handleGetSavedFiles={handleGetSavedFiles}
        handleDelete={deleteOrSave}
        handleSave={deleteOrSave}
      />,
    );

    act(() => {
      const saveButton = screen.getByText("filename");
      user.click(saveButton);
    });

    await waitFor(async () => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveTextContent("Overwrite filename?");
      const yesButton = screen.getByText("Yes");
      await user.click(yesButton);
      expect(response).toBe("filename");
    });
  });

  it("deletes", async () => {
    render(
      <SaveForm
        handleGetSavedFiles={handleGetSavedFiles}
        handleDelete={deleteOrSave}
        handleSave={deleteOrSave}
      />,
    );

    act(() => {
      const saveButton = screen.getByText("[delete]");
      user.click(saveButton);
    });

    await waitFor(async () => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveTextContent("Delete filename?");
      const yesButton = screen.getByText("Yes");
      await user.click(yesButton);
      expect(response).toBe("filename");
    });
  });

  it("saves", async () => {
    render(
      <SaveForm
        handleGetSavedFiles={handleGetSavedFiles}
        handleDelete={deleteOrSave}
        handleSave={deleteOrSave}
      />,
    );

    act(() => {
      const saveButton = screen.getByText("Save");
      user.click(saveButton);
    });

    await waitFor(async () => {
      expect(response).toBe("(unnamed)");
    });
  });
});
