import Image from "next/image";
import mccWhiteLogo from "@/../public/mccWhite.svg";
import mccWhiteSmallLogo from "@/../public/mccWhiteSmall.svg";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Nav({
  pages = [],
  rightPages = [],
}: {
  pages?: Array<[string, string]>;
  rightPages?: Array<[string, string]>;
  user?: string | null;
}) {
  const router = useRouter();

  if (!rightPages.length || rightPages[rightPages.length - 1][0] != "Sign Out")
    rightPages.push(["Sign Out", "/?signout=true"]);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed. Menu open: "hidden", Menu closed: "block" */}
                <svg
                  className={"h-6 w-6 " + (menuOpen ? "hidden" : "block")}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* Icon when menu is open. Menu open: "block", Menu closed: "hidden" */}
                <svg
                  className={"h-6 w-6 " + (menuOpen ? "block" : "hidden")}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/dashboard">
                  <Image
                    className="block h-8 w-auto sm:hidden"
                    priority={true}
                    src={mccWhiteSmallLogo}
                    alt="MCC Small Logo"
                  />
                  <Image
                    className="hidden h-8 w-auto sm:block"
                    priority={true}
                    src={mccWhiteLogo}
                    alt="MCC Logo"
                  />
                </Link>
              </div>
              <div className="hidden md:ml-6 md:block w-full">
                <div className="flex">
                  {pages.map(([pageName, pageLink], index) => {
                    return (
                      <Link
                        key={index}
                        href={pageLink}
                        className={
                          (router.pathname == pageLink
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white") +
                          " rounded-md px-3 py-2 text-sm font-medium" +
                          (index == 0 ? " ml-0" : " ml-2")
                        }
                        aria-current={
                          router.pathname == pageLink ? "page" : undefined
                        }
                      >
                        {pageName}
                      </Link>
                    );
                  })}
                  <div className="flex-auto"></div>
                  {rightPages.map(([pageName, pageLink], index) => {
                    return (
                      <Link
                        key={index}
                        href={pageLink}
                        className={
                          (router.pathname == pageLink
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white") +
                          " rounded-md px-3 py-2 text-sm font-medium" +
                          (index == 0 ? " ml-0" : " ml-2")
                        }
                        aria-current={
                          router.pathname == pageLink ? "page" : undefined
                        }
                      >
                        {pageName}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div
          className={"md:hidden" + (menuOpen ? "" : " hidden")}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {[...pages, ...rightPages].map(([pageName, pageLink], index) => {
              return (
                <Link
                  key={index}
                  href={pageLink}
                  className={
                    (router.pathname == pageLink
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white") +
                    " block rounded-md px-3 py-2 text-base font-medium"
                  }
                  aria-current={
                    router.pathname == pageLink ? "page" : undefined
                  }
                >
                  {pageName}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
