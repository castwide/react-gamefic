import { Driver } from "gamefic-driver";
import { ReactNode, PropsWithChildren } from "react";

type JSONValue = string | number | boolean | JSONObject | JSONArray | null;

interface JSONObject {
  [x: string]: JSONValue;
}

type JSONArray = Array<JSONValue>;

type HandleInputType = (command: string | null) => void;

interface ConsoleProps {
  driver: Driver;
  withConsoleCommands?: boolean;
  className?: string;
  historySize?: number;
  undoSize?: number;
}

type ConsolePropsType = PropsWithChildren<ConsoleProps>;

interface OutputType {
  last_input: string | null;
  last_prompt: string | null;
  messages: string;
  options: string[];
  queue: string[];
  scene: {
    name: string;
    type: string;
  };
  prompt: string;
  [key: string]: JSONValue;
}

interface SaveFileType {
  name: string;
  date: string | null;
  timestamp: number;
}

enum ConsoleMode {
  Game = "game",
  Save = "save",
  Restore = "restore",
}

interface GameContextType {
  consoleMode: ConsoleMode;
  output: OutputType;
  history: OutputType[];
  setConsoleMode: (mode: ConsoleMode) => void;
  handleInput: HandleInputType;
  handleSave: (name: string) => void;
  handleRestore: (name: string) => void;
  handleNew: () => void;
  handleDelete: (name: string) => void;
  handleGetSavedFiles: () => SaveFileType[];
  handleUndo: () => void;
}

interface ScenePropsType {
  output: OutputType;
  history: OutputType[];
  handleInput: HandleInputType;
  className?: string;
}

interface TerminalPropsType {
  namedScenes: {
    [key: string]: React.FunctionComponent<ScenePropsType>;
  };
  typedScenes: {
    [key: string]: React.FunctionComponent<ScenePropsType>;
  };
  className?: string;
}

interface CommandButtonProps {
  command: string;
  handleInput?: HandleInputType;
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
}

export {
  CommandButtonProps,
  ConsoleMode,
  ConsolePropsType,
  GameContextType,
  HandleInputType,
  JSONArray,
  JSONObject,
  JSONValue,
  OutputType,
  SaveFileType,
  ScenePropsType,
  TerminalPropsType,
};
