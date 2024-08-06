import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act, render, screen, waitFor } from "@testing-library/react";
import RestoreForm from "./RestoreForm";

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

const deleteOrRestore = (name: string) => {
  response = name;
};

beforeEach(() => {
  response = null;
});

describe("<RestoreForm />", () => {
  it("restores", async () => {
    render(
      <RestoreForm
        handleGetSavedFiles={handleGetSavedFiles}
        handleDelete={deleteOrRestore}
        handleRestore={deleteOrRestore}
      />,
    );

    act(() => {
      const saveButton = screen.getByText("filename");
      user.click(saveButton);
    });

    await waitFor(async () => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveTextContent("restore filename?");
      const yesButton = screen.getByText("Yes");
      await user.click(yesButton);
      expect(response).toBe("filename");
    });
  });

  it("deletes", async () => {
    render(
      <RestoreForm
        handleGetSavedFiles={handleGetSavedFiles}
        handleDelete={deleteOrRestore}
        handleRestore={deleteOrRestore}
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
});
