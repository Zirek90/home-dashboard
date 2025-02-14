interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  onAbort?: () => void;
}

export function CircularProgress(props: CircularProgressProps) {
  const { progress, size = 35, strokeWidth = 4, color = "#4CAF50", onAbort } = props;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((100 - progress) / 100) * circumference;

  return (
    <div className="relative flex justify-center items-center">
      <svg width={size} height={size} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" transform="rotate(-90)">
        <circle cx="25" cy="25" r={radius} stroke="#e6e6e6" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      {onAbort && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAbort();
          }}
          className="absolute black dark:white"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
          }}
        >
          X
        </button>
      )}
    </div>
  );
}
