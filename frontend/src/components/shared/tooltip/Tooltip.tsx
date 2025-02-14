import { PropsWithChildren } from "react";

interface TooltipProps {
  message: string;
}

export function Tooltip(props: PropsWithChildren<TooltipProps>) {
  const { children, message } = props;
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-sm px-2 py-1 rounded-md max-w-max whitespace-nowrap">
        {message}
      </div>
    </div>
  );
}
