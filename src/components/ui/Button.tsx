import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = "", ...props }: ButtonProps) {
  const baseClassName =
    "inline-flex items-center justify-center rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-teal-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <button className={`${baseClassName} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
