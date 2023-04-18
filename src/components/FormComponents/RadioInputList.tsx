export default function RadioInputList({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="space-y-0">
      <div className="px-2 py-1">{title}</div>
      {children}
    </div>
  );
}
