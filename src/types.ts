import { Driver } from 'gamefic-driver';
import { ReactFragment } from 'react';

type HandleInputType = (command: string | null) => void

interface ConsolePropsType {
	driver: Driver,
	className: string,
	children: ReactFragment
}

interface GameContextType {
  output?: any,
  history?: any[],
  handleInput?: HandleInputType,
  handleSave?: (name: string) => void,
  handleRestore?: (name: string) => void,
  handleNew?: () => void,
  handleDelete?: (name: string) => void,
  handleGetSavedFiles?: () => any
}

interface SaveFileType {
	name: string,
	date: string | null,
	timestamp: number
}

export {
  ConsolePropsType,
  HandleInputType,
  GameContextType,
  SaveFileType
}
