// TODO fix response from backend to return number as a size
export const bytesToMegabytes = (bytes: string | number): string => {
  return (parseInt(bytes.toString()) / 1024 / 1024).toFixed(2) + "MB";
};
