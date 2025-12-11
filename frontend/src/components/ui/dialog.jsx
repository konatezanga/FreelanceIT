"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";
import { cn } from "./utils";

const DialogContext = React.createContext(null);

function useDialogContext() {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("Dialog components must be used within <Dialog>");
  return ctx;
}

function Dialog({ open: controlledOpen, onOpenChange, children, ...props }) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (v) => {
      if (isControlled) onOpenChange?.(v);
      else setUncontrolledOpen(v);
    },
    [isControlled, onOpenChange]
  );

  const value = React.useMemo(() => ({ open, setOpen }), [open, setOpen]);

  return (
    <DialogContext.Provider value={value}>
      <div data-slot="dialog" {...props}>{children}</div>
    </DialogContext.Provider>
  );
}

function DialogTrigger({ asChild, children, ...props }) {
  const { setOpen } = useDialogContext();
  const child = React.Children.only(children);

  const triggerProps = {
    ...props,
    onClick: (e) => {
      props.onClick?.(e);
      setOpen(true);
    },
  };

  if (asChild && React.isValidElement(child)) {
    return React.cloneElement(child, triggerProps);
  }

  return (
    <button type="button" data-slot="dialog-trigger" {...triggerProps}>
      {children}
    </button>
  );
}

function DialogPortal({ children }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

function DialogOverlay({ className, onClick, ...props }) {
  return (
    <div
      data-slot="dialog-overlay"
      className={cn("fixed inset-0 z-50 bg-black/50", className)}
      onClick={onClick}
      {...props}
    />
  );
}

function DialogContent({ className, children, ...props }) {
  const { open, setOpen } = useDialogContext();
  const overlayRef = React.useRef(null);

  React.useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKeyDown);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  if (!open) return null;

  function onOverlayClick(e) {
    if (e.target === e.currentTarget) setOpen(false);
  }

  return (
    <DialogPortal>
      <DialogOverlay ref={overlayRef} onClick={onOverlayClick} />
      <div
        data-slot="dialog-content"
        className={cn(
          "bg-background fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border p-6 shadow-lg sm:max-w-lg",
          className
        )}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        {children}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          data-slot="dialog-close"
          aria-label="Close"
        >
          <XIcon />
        </button>
      </div>
    </DialogPortal>
  );
}

function DialogClose({ asChild, children, ...props }) {
  const { setOpen } = useDialogContext();
  const child = React.Children.only(children ?? <button />);
  const closeProps = {
    ...props,
    onClick: (e) => {
      props.onClick?.(e);
      setOpen(false);
    },
  };
  if (asChild && React.isValidElement(child)) return React.cloneElement(child, closeProps);
  return (
    <button type="button" data-slot="dialog-close" {...closeProps}>
      {children ?? "Close"}
    </button>
  );
}

function DialogHeader({ className, ...props }) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }) {
  return (
    <h2
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }) {
  return (
    <p
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};