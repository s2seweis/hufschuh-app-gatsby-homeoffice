/**
 *
 * @param base64string
 * @param name filename (including file type/ending)
 * @returns {File}
 */
export function base64ToFile({ base64string, name }) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;

  if (base64string.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(base64string.split(",")[1]);
  else byteString = unescape(base64string.split(",")[1]);

  // separate out the mime component
  let mimeString;
  try {
    mimeString = base64string.split(",")[0].split(":")[1].split(";")[0];
  } catch (e) {
    console.error("erorr with mime string", e);
  }

  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new File([ia], name, { type: mimeString });
}
