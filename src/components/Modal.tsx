export interface ModalInfo {
  title?: React.ReactNode;
  icon?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  hidden?: boolean;
  mainText?: string;
  mainColors?: string;
  mainOnClick?: () => void;
  secondaryText?: string;
  secondaryShow?: boolean;
  secondaryColors?: string;
  secondaryOnClick?: () => void;
}

export function reducer(state: ModalInfo, action: ModalInfo) : ModalInfo {
  return {
    ...state,
    ...action,
  };
}

export default function Modal({
  title,
  icon,
  children,
  className,
  hidden = true,
  mainText = "OK",
  mainColors,
  mainOnClick,
  secondaryText = "Cancel",
  secondaryShow = true,
  secondaryColors,
  secondaryOnClick,
}: ModalInfo) {
  console.log(children);
  const icons: {
    [key: string]: React.ReactNode;
  } = {
    checkmark: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 96 960 960"
        width="48"
      >
        <path
          className="fill-green-300"
          d="m421 667-98-98q-9-9-22-9t-23 10q-9 9-9 22t9 22l122 123q9 9 21 9t21-9l239-239q10-10 10-23t-10-23q-10-9-23.5-8.5T635 453L421 667Zm59 309q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Z"
        />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 96 960 960"
        width="48"
      >
        <path
          className="fill-red-300"
          d="M479.754 801Q504 801 519.5 786.246q15.5-14.755 15.5-39Q535 723 519.746 707q-15.255-16-39.5-16Q456 691 440.5 706.982 425 722.965 425 747.211q0 24.245 15.254 39.017Q455.509 801 479.754 801Zm3.421-177Q503 624 516.5 610.375 530 596.75 530 577V401q0-19.75-13.675-33.375Q502.649 354 482.825 354 463 354 449.5 367.625 436 381.25 436 401v176q0 19.75 13.675 33.375Q463.351 624 483.175 624Zm-2.771 377q-88.872 0-166.125-33.084-77.254-33.083-135.183-91.012-57.929-57.929-91.012-135.119Q55 664.594 55 575.638q0-88.957 33.084-166.285 33.083-77.328 90.855-134.809 57.772-57.482 135.036-91.013Q391.238 150 480.279 150q89.04 0 166.486 33.454 77.446 33.453 134.853 90.802 57.407 57.349 90.895 134.877Q906 486.66 906 575.734q0 89.01-33.531 166.247-33.531 77.237-91.013 134.86-57.481 57.623-134.831 90.891Q569.276 1001 480.404 1001Z"
        />
      </svg>
    ),
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 96 960 960"
        width="48"
      >
        <path
          className="fill-yellow-300"
          d="M100 949q-14.483 0-24.98-6.925Q64.521 935.15 59 925q-6.167-9.6-6.583-22.381Q52 889.839 59 877l380-656q7-12 18.103-17.5 11.102-5.5 23-5.5Q492 198 503 203.5q11 5.5 18 17.5l380 656q7 12.839 6.583 25.619Q907.167 915.4 901 925q-5.696 9.75-16.106 16.875Q874.483 949 860 949H100Zm384.175-132q13.4 0 23.613-10.388Q518 796.224 518 782.825q0-13.4-10.388-23.112Q497.224 750 483.825 750q-13.4 0-23.613 9.888Q450 769.776 450 783.175q0 13.4 10.388 23.612Q470.776 817 484.175 817Zm0-109q12.825 0 21.325-8.625T514 678V522q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T454 522v156q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625Z"
        />
      </svg>
    ),
    notif: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 96 960 960"
        width="48"
      >
        <path
          className="fill-blue-300"
          d="M480.281 621Q494 621 503 611.8q9-9.2 9-22.8V450q0-12.6-9.281-21.8-9.28-9.2-23-9.2-13.719 0-22.219 9.2-8.5 9.2-8.5 21.8v139q0 13.6 8.993 22.8 8.993 9.2 22.288 9.2Zm-.299 107q14.593 0 25.806-10.982Q517 706.035 517 691.518 517 677 505.805 666t-25.787-11q-14.593 0-25.806 11.079Q443 677.158 443 691.579T454.195 717q11.195 11 25.787 11ZM165.44 878q-21.19 0-34.815-13.675-13.625-13.676-13.625-34Q117 810 130.625 796.5 144.25 783 165 783h45V505q0-92.085 53.5-167.542Q317 262 407 241.583V218q0-30.5 21.223-50.75T479.765 147q30.318 0 51.777 20.25Q553 187.5 553 218v23.583Q644 262 698 337.458 752 412.915 752 505v278h44q19.625 0 33.812 13.675 14.188 13.676 14.188 34Q844 851 829.812 864.5 815.625 878 796 878H165.44Zm315.06 123q-35.45 0-61.975-25.85T392 913h177q0 37-26.231 62.5-26.232 25.5-62.269 25.5Z"
        />
      </svg>
    ),
  };
  return (
    <div
      className={"relative z-10 " + className}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      hidden={hidden}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  {icon
                    ? typeof icon === "string"
                      ? icons[icon]
                        ? icons[icon]
                        : icon
                      : icon
                    : null}
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">{children}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className={
                  "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 sm:ml-3 sm:w-auto " +
                  mainColors
                }
                onClick={mainOnClick}
              >
                {mainText}
              </button>
              <button
                type="button"
                className={
                  "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:opacity-80 sm:mt-0 sm:w-auto " +
                  secondaryColors
                }
                hidden={!secondaryShow}
                onClick={secondaryOnClick}
              >
                {secondaryText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
