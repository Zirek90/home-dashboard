import {
  FaFilePdf,
  FaFileAlt,
  FaFileImage,
  FaFileAudio,
  FaFileVideo,
  FaFileArchive,
  FaFile,
  FaFileExcel,
} from "react-icons/fa";

export function getIconForExtension(extension: string) {
  const extensionMap: { [key: string]: JSX.Element } = {
    pdf: <FaFilePdf className="text-red-500" />,
    txt: <FaFileAlt className="text-gray-500" />,
    doc: <FaFileAlt className="text-blue-500" />,
    docx: <FaFileAlt className="text-blue-500" />,
    xls: <FaFileExcel className="text-green-500" />,
    xlsx: <FaFileExcel className="text-green-500" />,
    jpg: <FaFileImage className="text-yellow-500" />,
    jpeg: <FaFileImage className="text-yellow-500" />,
    png: <FaFileImage className="text-yellow-500" />,
    mp3: <FaFileAudio className="text-indigo-500" />,
    mp4: <FaFileVideo className="text-purple-500" />,
    avi: <FaFileVideo className="text-purple-500" />,
    mkv: <FaFileVideo className="text-purple-500" />,
    zip: <FaFileArchive className="text-orange-500" />,
    rar: <FaFileArchive className="text-orange-500" />,
  };

  return extensionMap[extension] || <FaFile className="text-gray-500" />;
}
