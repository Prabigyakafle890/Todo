import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      {...props}
    >
      {children}
    </button>
  );
}
