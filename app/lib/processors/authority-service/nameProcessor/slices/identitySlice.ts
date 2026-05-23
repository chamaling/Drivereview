import "server-only"
import Slice from "./slice"
const identityKeywords: string[] = [
  // All of these keywords are related to identity documents
  // which are most cases crucial to keep so these will have higher weights
  // Vital Records
  "birthcertificate",
  "birthrecord",
  "certificateoflivebirth",
  "adoption",
  "marriage",
  "divorce",
  "annulment",
  "death",
  "naturalization",
  "citizenship",
  // IDs & Government Documents
  "passport",
  "driverslicense",
  "stateID",
  "socialsecurity",
  "SSN",
  "\\bEIN\\b",
  "ITIN",
  "greencard",
  "permanentresident",
  "\\bvisa\\b",
  "workpermit",
  "nationalID",
  "governmentID",
  "photoID",
  // Legal Documents
  "powerofattorney",
  "POA",
  "guardianship",
  "custodyagreement",
  "restrainingorder",
  "courtorder",
  "namechange",
  "deedpoll",
  "notarized",
  "affidavit",
  // Credentials & Licenses
  "diploma",
  "degree",
  "transcript",
  "GED",
  "certification",
  "professionallicense",
  "barexam",
  "nursinglicense",
  "medicallicense",
  "teachingcertificate",
  "tradelicense",
  "accreditation",
  "credential",
]
const identitySlice = new Slice(identityKeywords, Infinity)
export default identitySlice
