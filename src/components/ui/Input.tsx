import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-xl border border-slate-200 bg-white/85 px-4 py-3 text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200 ${className}`.trim()}
      {...props}
    />
  );
}
