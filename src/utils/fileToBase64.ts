
/**
 * Converts a File object to a base64-encoded string.
 * @param file - The File object to convert
 * @returns A Promise that resolves with the base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result); // base64 string with data:image/... prefix
      } else {
        reject(new Error("FileReader result is not a string"));
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export default fileToBase64;