export default function TextInput({
  id,
  inputName,
  placeholder,
  hook,
  disabled = false,
  errorMsg,
}: {
  children?: React.ReactNode;
  inputName?: string;
  id?: string;
  placeholder?: string;
  hook?: any;
  disabled?: boolean;
  errorMsg?: string;
}) {
  return (
    <div className="w-full">
      <div className="px-2 py-1">
        <label htmlFor={id}>{inputName || placeholder}</label>
        <div className="text-sm text-red-500">{errorMsg}</div>
      </div>
      <input
        type="text"
        className={
          "rounded-md relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" +
          " disabled:opacity-75 disabled:bg-slate-100"
        }
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        {...hook}
      ></input>
    </div>
  );
}
