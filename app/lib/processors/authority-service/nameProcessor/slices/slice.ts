import "server-only"
class Slice {
  private regObject: RegExp
  private defaultWeight: number = 1
  private keywordMap: Record<string, number> | null = null
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
      this.defaultWeight = defaultWeight
    } else {
      if (Array.isArray(keywordObject)) {
        throw new Error(
          "Expected a keyword map when default weight is not provided"
        )
      }
      const keywords = Object.keys(keywordObject)
      this.regObject = new RegExp(`(${keywords.join("|")})`, "i")
      this.defaultWeight = 1
      this.keywordMap = keywordObject
    }
  }

  process(name: string): number {
    const match = name.match(this.regObject)
    if (!match) {
      return 1
    }
    if (this.keywordMap) {
      return this.keywordMap[match[0].toLowerCase()] || this.defaultWeight
    }
    return this.defaultWeight
  }
}
