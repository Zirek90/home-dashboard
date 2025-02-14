interface ProgressBarProps {
  progress: number;
}

export function ProgressBar(props: ProgressBarProps) {
  const { progress } = props;

  const getColor = () => {
    if (progress <= 30) return "bg-red-500";
    if (progress <= 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="flex items-center space-x-2  w-full">
      <div className="relative w-full h-2 bg-gray-300 rounded">
        <div className={`absolute h-2 rounded ${getColor()}`} style={{ width: `${progress}%` }} />
      </div>
      <span className="text-sm">{progress}%</span>
    </div>
  );
}
