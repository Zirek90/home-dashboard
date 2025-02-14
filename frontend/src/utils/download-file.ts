export const downloadFile = (name: string, data: BlobPart, contentType = "application/octet-stream") => {
  const blob = new Blob([data], { type: contentType });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
