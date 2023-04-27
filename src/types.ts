type HandleInputType = (command: string | null) => void

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

export {
  HandleInputType,
  GameContextType
}
