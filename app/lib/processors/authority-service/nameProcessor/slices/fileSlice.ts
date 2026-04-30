import "server-only"
const fileObject = {
  // images with these keywords are typically default names for photos
  // so likely less important, but not completely unimportant
  img_: 0.5,
  screenshot: 0.5,
  dsc_: 0.5,
  dcim: 0.5,

  // videos with these keywords are typically default names for videos
  // so likely less important, but not completely unimportant
  vid_: 0.5,
  mov_: 0.5,
  screen_recording: 0.5,
  "screen recording": 0.5,

  // files with these keywords are typically default names for documents, presentations, or spreadsheets
  // since they're untitled, that is a stronger signal that they may be less important
  // so give it a lower score than other default names
  "untitled document": 0.25,
  "untitled spreadsheet": 0.25,
  "untitled presentation": 0.25,

  // files created like these are duplicates, so usually less important
  "copy of": 0.5,
}
