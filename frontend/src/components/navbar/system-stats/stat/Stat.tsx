interface StatProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export function Stat(props: StatProps) {
  const { label, value, icon } = props;

  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-gray-500">{label}</span>
      <div className="flex items-center gap-1">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}
