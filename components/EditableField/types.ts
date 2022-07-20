import { InputHTMLAttributes } from "react";

export type EditableFieldProps = {
  icon?: React.ReactNode;
  onConfirm: (value: string) => Promise<void>;
  onCancel?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;
