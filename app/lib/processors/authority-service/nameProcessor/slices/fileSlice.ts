const fileSlice = {
  // images with these keywords are typically default names for photos
  // so likely less important, but not completely uninmportant
  IMG_: 0.5,
  Screenshot: 0.5,
  DSC_: 0.5,
  DCIM: 0.5,

  // videos with these keywords are typically default names for videos
  // so likely less important, but not completely uninmportant
  VID_: 0.5,
  MOV_: 0.5,
  Screen_Recording: 0.5,
  "Screen Recording": 0.5,

  // files with these keywords are typically default names for documents, presentations, or spreadsheets
  // since they're untitled, that is a stronger signal that they may be less important
  // so give it a lower score than other default names
  "Untitled document": 0.25,
  "Untitled spreadsheet": 0.25,
  "Untitled presentation": 0.25,
  // files created like these are duplicates, so usually less important
  "Copy of": 0.5,
}

export default fileSlice
