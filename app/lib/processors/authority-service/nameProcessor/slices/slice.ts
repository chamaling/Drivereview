import keywordSettings from "../keywordSettings"

class Slice {
  constructor(keywordArray: string[], defaultWeight: number)
  constructor(keywordMap: Record<string, string | keywordSettings>)

  constructor(
    keywordObject: string[] | Record<string, string | keywordSettings>,
    defaultWeight?: number
  ) {
    if (defaultWeight) {
      if (!Array.isArray(keywordObject)) {
        throw new Error(
          "Expected an array of keywords when default weight is provided"
        )
      }
    } else {
      if (Array.isArray(keywordObject)) {
        throw new Error(
          "Expected a keyword map when default weight is not provided"
        )
      }
    }
  }
}
