import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Nav(props) {
  const router = useRouter();
  const pages = props.pages;

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-8 w-auto lg:hidden"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
                <img
                  className="hidden h-8 w-auto lg:block"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {Object.keys(pages).map((page, index) => {
                    return (
                      <Link
                        key={index}
                        href={pages[page]}
                        className={
                          (router.pathname == pages[page] ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white") +
                          " rounded-md px-3 py-2 text-sm font-medium"
                        }
                        aria-current={router.pathname == pages[page] ? "page" : undefined}
                      >
                        {page}
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
          className={"sm:hidden" + (menuOpen ? "" : " hidden")}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {
              Object.keys(pages).map((page, index) => {
                return (
                  <Link
                    key={index}
                    href={pages[page]}
                    className={
                      (router.pathname == pages[page] ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white") +
                      " block rounded-md px-3 py-2 text-base font-medium"
                    }
                    aria-current={router.pathname == pages[page] ? "page" : undefined}
                  >
                    {page}
                  </Link>
                );
              })
            }
          </div>
        </div>
      </nav>
    </div>
  );
}
