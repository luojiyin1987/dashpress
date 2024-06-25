import { useLingui } from "@lingui/react";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "./use-toast";

export function Toaster() {
  const { toasts } = useToast();
  const { _ } = useLingui();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, variant, description, action, ...props }) => {
        return (
          <Toast
            key={id}
            {...props}
            duration={variant === "danger" || action ? 10000 : 5000}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{_(title)}</ToastTitle>}
              {description && (
                <ToastDescription>{_(description)}</ToastDescription>
              )}
            </div>
            {action && (
              <ToastAction onClick={action.action} altText={_(action.label)}>
                {_(action.label)}
              </ToastAction>
            )}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
