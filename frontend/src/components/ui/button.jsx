"use client";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold text-sm transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-orange-500 to-green-600 text-white hover:scale-105 hover:shadow-lg hover:from-orange-400 hover:to-green-500 active:scale-95",
        outline:
          "border-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:shadow-md hover:text-orange-700 active:scale-95",
        secondary:
          "bg-white text-orange-600 hover:bg-orange-100 hover:scale-105 hover:shadow-md active:scale-95",
        ghost:
          "text-gray-700 hover:bg-orange-100 hover:text-orange-600 active:scale-95",
        link: "text-orange-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6",
        sm: "h-8 px-4 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "size-10 p-0 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
