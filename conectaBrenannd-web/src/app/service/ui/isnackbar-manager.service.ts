export interface ISnackbarManagerService {
  show(message: string, action?: string, duration?: number): void;
}
