export default function InputList({
  title,
  hidden = false,
  children,
  props,
}: {
  title?: string;
  hidden?: any;
  children?: React.ReactNode;
  props?: any;
}) {
  return (
    <div
      hidden={hidden}
      className="space-y-2 rounded-md p-4 border-solid border-2 border-indigo-600"
      {...props}
    >
      <div className="font-bold text-center text-xl">{title}</div>
      {children}
    </div>
  );
};
