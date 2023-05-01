import { Driver } from 'gamefic-driver';
import { ReactFragment } from 'react';

type JSONValue =
    | string
    | number
    | boolean
    | JSONObject
    | JSONArray;

interface JSONObject {
    [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> { }

type HandleInputType = (command: string | null) => void

interface ConsolePropsType {
	driver: Driver,
	className: string,
	children: ReactFragment
}

interface OutputType {
  last_input: string,
  last_prompt: string,
  messages: string,
  options: string[],
  queue: string[],
  scene: {
    name: string,
    type: string
  },
  [key: string]: JSONValue
}

interface SaveFileType {
	name: string,
	date: string | null,
	timestamp: number
}

interface GameContextType {
  output?: OutputType,
  history?: OutputType[],
  metaState?: string | null,
  handleInput?: HandleInputType,
  handleSave?: (name: string) => void,
  handleRestore?: (name: string) => void,
  handleNew?: () => void,
  handleDelete?: (name: string) => void,
  handleGetSavedFiles?: () => SaveFileType[],
  handleUndo?: () => void
}

interface ScenePropsType {
  output?: OutputType,
  history?: OutputType[],
  handleInput?: HandleInputType,
  className?: string
}

interface TerminalPropsType {
  namedScenes: {
    [key: string]: React.FunctionComponent<ScenePropsType>
  },
  typedScenes: {
    [key: string]: React.FunctionComponent<ScenePropsType>
  },
  className?: string
}

export {
  ConsolePropsType,
  GameContextType,
  HandleInputType,
  JSONArray,
  JSONObject,
  JSONValue,
  OutputType,
  SaveFileType,
  ScenePropsType,
  TerminalPropsType
}
