import Image from "next/image";
import mccLogo from "@/../public/mcc.svg";
import Link from "next/link";

export default function AuthLayout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen bg-gradient-radial from-white via-white to-blue-200">
      <div className="min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full">
          <div>
            <Link href="/">
              <Image
                className="mx-auto h-12 w-auto"
                priority={true}
                src={mccLogo}
                alt="MCC Logo"
              />
            </Link>
            {title ? (
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                {title}
              </h2>
            ) : null}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
