/**
 * returns true if iOS is used
 * @returns {boolean}
 */
export function detectIos() {


  const regex = new RegExp("iPhone|iPad|iPod");

  return regex.test(navigator.userAgent);
}

/**
 * detect if an image is valid
 * @param img
 * @returns {boolean}
 */
export function isImage(img) {
  // if image could not be saved, is results to: "data:,"
  return img.length > 7;
}
