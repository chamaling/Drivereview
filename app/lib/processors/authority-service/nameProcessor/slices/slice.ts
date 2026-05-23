import "server-only"

export default class Slice {
  private regObject: RegExp
  private defaultWeight: number = 0
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

      this.regObject = new RegExp(`(${keywordObject.join("|")})`, "gi")
      this.defaultWeight = defaultWeight
    } else {
      if (Array.isArray(keywordObject)) {
        throw new Error(
          "Expected a keyword map when default weight is not provided"
        )
      }
      const keywords = Object.keys(keywordObject)
      this.regObject = new RegExp(`(${keywords.join("|")})`, "gi")
      this.defaultWeight = 0
      this.keywordMap = keywordObject
    }
  }

  private normalize(str: string): string {
    return str.replace(/[\s_\-']/g, "").toLowerCase()
  }

  process(name: string): number {
    const match = this.normalize(name).match(this.regObject)

    if (!match) {
      return 0
    }

    if (this.keywordMap) {
      // choose lowest weight if multiple keywords match

      let lowestWeight = this.defaultWeight

      for (const keyword of match) {
        const weight = this.keywordMap[keyword.toLowerCase()]
        if (weight && weight < lowestWeight) {
          lowestWeight = weight
        }
      }

      return lowestWeight
    }
    return this.defaultWeight
  }
}
