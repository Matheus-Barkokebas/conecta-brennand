import { InjectionToken } from "@angular/core";
import { IUsuarioService } from "./api/usuario/iusuario.service";
import { ISnackbarManagerService } from "./isnackbar-manager.service";
import { IDialogManagerService } from "./idialog-manger.service";

export const SERVICES_TOKEN = {
  HTTP: {
    USUARIO: new InjectionToken<IUsuarioService>('SERVICES_TOKEN.HTTP.USUARIO')
  },
  SNACKBAR: new InjectionToken<ISnackbarManagerService>(
    'SNACKBAR_TOKEN.SNACKBAR'
  ),
  DIALOG: new InjectionToken<IDialogManagerService>('SNACKBAR_TOKEN.DIALOG'),
};
