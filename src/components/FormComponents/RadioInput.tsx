export default function RadioInput({ children, id, disabled = false, hook = {}, value }:{
    children: React.ReactNode;
    id: string;
    disabled: boolean;
    hook?: object;
    value?: string;
}) {
  return (<div className={"flex space-x-2 p-1 text-sm font-bold " + (disabled ? " text-gray-400" : "")}>
    <input
      disabled={disabled}
      type="radio"
      id={id}
      {...hook}
      className="inline-block"
      value={value || id}
    />
    <label className="inline-block w-full" htmlFor={id}>
      {children}
    </label>
  </div>);
}
