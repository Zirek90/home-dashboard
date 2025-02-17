export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024; // factor for conversion
  const dm = decimals < 0 ? 0 : decimals; // rounding decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  let i = 0;
  let byteValue = bytes * 1024 * 1024; // convert MB to Bytes

  while (byteValue >= k && i < sizes.length - 1) {
    byteValue /= k;
    i++;
  }

  return `${parseFloat(byteValue.toFixed(dm))} ${sizes[i]}`;
}
