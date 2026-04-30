import "server-only"
const identityKeywords: string[] = [
  // All of these keywords are related to identity documents
  // which are most cases crucial to keep so these will have higher weights

  // Vital Records
  "birth certificate",
  "birth record",
  "certificate of live birth",
  "adoption",
  "marriage",
  "divorce",
  "annulment",
  "death",
  "naturalization",
  "citizenship",

  // IDs & Government Documents
  "passport",
  "driver's license",
  "state ID",
  "social security",
  "SSN",
  "\\bEIN\\b",
  "ITIN",
  "green card",
  "permanent resident",
  "\\bvisa\\b",
  "work permit",
  "national ID",
  "government ID",
  "photo ID",

  // Legal Documents
  "power of attorney",
  "POA",
  "guardianship",
  "custody agreement",
  "restraining order",
  "court order",
  "name change",
  "deed poll",
  "notarized",
  "affidavit",

  // Credentials & Licenses
  "diploma",
  "degree",
  "transcript",
  "GED",
  "certification",
  "professional license",
  "bar exam",
  "nursing license",
  "medical license",
  "teaching certificate",
  "trade license",
  "accreditation",
  "credential",
]
