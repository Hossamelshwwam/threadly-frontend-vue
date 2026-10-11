export type Variant = "default" | "danger" | "warning" | "info" | "success";

export interface ConfirmationDialogProps {
  onConfirm: () => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  loadingText?: string;
  requireCheckbox?: boolean;
  checkboxLabel?: string;
  variant?: Variant;
  autoClose?: boolean;
}
