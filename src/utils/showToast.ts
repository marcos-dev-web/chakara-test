import { AlertStatus } from "@chakra-ui/alert";
import { ToastPositionWithLogical, UseToastOptions } from "@chakra-ui/toast";

type Toast = (options?: UseToastOptions) => any;
interface IOptions {
  description: string;
  duration?: number;
  status?: AlertStatus;
  position?: ToastPositionWithLogical;
  variant?: "subtle" | "solid" | "left-accent" | "top-accent" | (string & {});
}

function showToast(toast: Toast, options: IOptions) {
  toast({
    description: options.description,
    duration: options?.duration || 2000,
    status: options?.status || "info",
    isClosable: true,
    position: options?.position || "top",
    variant: options?.variant || "left-accent",
  });
}

export default showToast;
