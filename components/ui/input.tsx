import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className="border px-4 py-2 rounded w-full"
    />
  );
}