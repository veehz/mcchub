import Image from "next/image";
import mccLogo from "@/../public/mcc.svg"

export default function FormLayout({
  children,
  title = "This is the default title",
  noMaxWidth = false,
} : {
  children: React.ReactNode;
  title?: string;
  noMaxWidth?: boolean;
}) {
  return (
    <div>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full space-y-8 max-w-md">
          <div>
            <Image
              className="mx-auto h-12 w-auto"
              src={mccLogo}
              alt="MCC Logo"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
