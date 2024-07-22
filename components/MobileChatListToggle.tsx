import { Button } from "./ui/button";
import React, { forwardRef } from "react";

const MobileChatListToggle = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <Button
      ref={ref}
      {...props}
      variant="ghost"
      className="p-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
    >
      <svg
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
      >
        <path
          d="M3 5H11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M3 12H16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M3 19H21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      <span className="sr-only">Toggle Menu</span>
    </Button>
  );
});

MobileChatListToggle.displayName = "MobileChatListToggle";

export default MobileChatListToggle;
