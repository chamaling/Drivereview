import { FileType } from "@/app/schemas/filterSchema"
export type FileGroup = Partial<Record<FileType, boolean>>
export type FileTypeAction = { type: "TOGGLE_FILE_TYPE"; payload: FileType }
export type FileButton = {
  fileType: FileType
  src: string
}

export function fileTypeReducer(
  state: FileGroup,
  action: FileTypeAction
): FileGroup {
  console.log(
    "Reducer called with state:",
    JSON.stringify(state),
    "and action:",
    JSON.stringify(action)
  )
  switch (action.type) {
    case "TOGGLE_FILE_TYPE":
      if (state[action.payload]) {
        const newState = { ...state }
        delete newState[action.payload]
        return newState
      } else {
        return { ...state, [action.payload]: true }
      }
    default:
      return state
  }
}
