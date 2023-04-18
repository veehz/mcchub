export default function RadioInputList({
  title,
  children,
  errorMsg,
}: {
  title?: string;
  children?: React.ReactNode;
  errorMsg?: string;
}) {
  return (
    <div className="space-y-0">
      <div className="px-2 py-1">
        {title}{" "}
        <span className="text-sm text-red-500">{errorMsg}</span>
      </div>
      {children}
    </div>
  );
}
