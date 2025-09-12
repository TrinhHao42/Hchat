interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  placeholder?: string;
  icon: React.ComponentType<{ className?: string }>;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  isPassword?: boolean;
}

export type { InputFieldProps };