import keywordSettings from "../keywordSettings"

class Slice {
  private regObject: RegExp

  constructor(keywordArray: string[], defaultWeight: number)
  constructor(keywordMap: Record<string, number>)

  constructor(
    keywordObject: string[] | Record<string, number>,
    defaultWeight?: number
  ) {
    if (defaultWeight) {
      if (!Array.isArray(keywordObject)) {
        throw new Error(
          "Expected an array of keywords when default weight is provided"
        )
      }

      this.regObject = new RegExp(`(${keywordObject.join("|")})`, "i")
    } else {
      if (Array.isArray(keywordObject)) {
        throw new Error(
          "Expected a keyword map when default weight is not provided"
        )
      }
      const keywords = Object.keys(keywordObject)
      this.regObject = new RegExp(`(${keywords.join("|")})`, "i")
    }
  }
}
