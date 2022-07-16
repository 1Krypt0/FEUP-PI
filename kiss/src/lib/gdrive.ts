/**
 * Retrieves the image ID from a google Drive URL
 * @returns The URL if it is in a valid format, or
 *     the empty string otherwise
 */
function getImageId (shareLink: string): string {
  return shareLink.split('https://drive.google.com/file/d/').join().replace(',', '').split('/').shift() || ''
}

/**
 * Makes the image exportable and viewable from the URL
 */
export function getImageLink (shareLink: string): string {
  const id = getImageId(shareLink)
  return 'https://drive.google.com/uc?export=view&id=' + id
}
