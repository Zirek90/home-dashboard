import { JSX } from "react";
import { FaWallet, FaBriefcase, FaGraduationCap, FaPaintBrush, FaPlane, FaShoppingCart } from "react-icons/fa";
import { CategoryEnum } from "@src/enums";

export function getIconForCategory(category: CategoryEnum) {
  const categoryMap: { [key in CategoryEnum]: JSX.Element } = {
    [CategoryEnum.GROCERY]: <FaShoppingCart className="text-green-500" />,
    [CategoryEnum.TRIP]: <FaPlane className="text-blue-500" />,
    [CategoryEnum.WORK]: <FaBriefcase className="text-gray-500" />,
    [CategoryEnum.EDUCATION]: <FaGraduationCap className="text-yellow-500" />,
    [CategoryEnum.HOBBY]: <FaPaintBrush className="text-purple-500" />,
    [CategoryEnum.OTHERS]: <FaWallet className="text-gray-500" />,
  };

  return categoryMap[category] || <FaWallet className="text-gray-500" />;
}
