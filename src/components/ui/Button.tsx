import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

interface ButtonBase {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  /**
   * Opt-in pointer attraction. Off by default — the design language is ambient
   * light, not magnetic distortion, and buttons should not move under the
   * pointer.
   *
   * Setting this adds `data-magnetic`, which <LightField> picks up through its
   * single delegated pointer listener. There is deliberately no per-button
   * `onMouseMove` handler here: those force a layout read on every pointer
   * event, and one listener for the whole page is cheaper than a dozen.
   */
  magnetic?: boolean;
}

interface ButtonLinkProps extends ButtonBase {
  href: string;
}

interface ButtonActionProps extends ButtonBase {
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className,
  magnetic = false,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      data-lit
      data-magnetic={magnetic || undefined}
      className={cn(
        variant === "primary" ? "btn-primary" : "btn-ghost",
        "transition-transform duration-300 ease-out-expo will-change-transform",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  children,
  className,
  type = "button",
  disabled,
  onClick,
  magnetic = false,
}: ButtonActionProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      data-lit
      data-magnetic={magnetic || undefined}
      className={cn(
        variant === "primary" ? "btn-primary" : "btn-ghost",
        "transition-transform duration-300 ease-out-expo will-change-transform disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
    >
      {children}
    </button>
  );
}
