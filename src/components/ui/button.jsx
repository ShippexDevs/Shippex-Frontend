import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  `
    inline-flex
    items-center
    justify-center
    whitespace-nowrap
    rounded-lg
    text-sm
    font-medium
    transition-colors
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-slate-400
    disabled:pointer-events-none
    disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default:
          "bg-[#0A2342] text-white hover:bg-[#123B63]",

        outline:
          "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",

        ghost:
          "text-slate-500 hover:bg-slate-100 hover:text-slate-900",

        destructive:
          "text-red-500 hover:bg-red-50 hover:text-red-600",
      },

      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3 text-xs",
        icon: "h-8 w-8",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
          })
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export {
  Button,
  buttonVariants,
};