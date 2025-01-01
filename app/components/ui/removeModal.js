import React from "react";
import DotPulsePreloader from "../ui/preloader/dotPulsePreloader";

const removeModal = ({
  title,
  primaryButtonText = "Confirm",
  secondaryButtonText = "Cancel",
  onClose,
  onPrimaryAction,
  onSecondaryAction,
  showSecondaryButton,
  deletePreloader,
}) => {
  return (
    <div className="fixed z-50 left-0 right-0 top-0 bottom-0 w-full bg-opacity-50 bg-black flex items-end lg:items-center">
      <div
        className="addressFormModal flex flex-col gap-9 w-full bg-white px-4 py-6 rounded-tl-2xl rounded-tr-2xl lg:rounded-xl lg:max-w-96 mx-auto 
                lg:max-h-[calc(100%-60px)] lg:overflow-y-scroll scrollbar-hide"
      >
        <div className="text-xl  flex items-center justify-between font-medium   relative">
          <div>{title}</div>
          <button className="close" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
            >
              <path
                d="M15.5 1L1.5 15M1.5 1L15.5 15"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="text-center  flex items-center justify-center gap-2">
          {/* Primary Button */}
          <button
            type="button"
            onClick={onPrimaryAction}
            className={`bg-red-600 hover:bg-red-500 py-3 px-8 rounded-lg font-medium text-base relative
                        disabled:opacity-50 transition-bg ${
                          deletePreloader
                            ? "text-red-600 hover:text-red-500"
                            : "text-white"
                        }`}
            disabled={deletePreloader}
          >
            {primaryButtonText}
            {deletePreloader && (
              <div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <DotPulsePreloader color={"#ffffff"} />
              </div>
            )}
          </button>

          {/* Secondary Button (conditionally rendered) */}
          {showSecondaryButton && (
            <button
              type="button"
              onClick={onSecondaryAction}
              className="bg-gray-100 hover:bg-gray-200 py-3 px-8 rounded-lg font-medium text-base text-black"
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default removeModal;
