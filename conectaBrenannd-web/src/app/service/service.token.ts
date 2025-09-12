import { InjectionToken } from "@angular/core";
import { ISnackbarManagerService } from "./ui/isnackbar-manager.service";
import { IDialogManagerService } from "./ui/idialog-manger.service";
import { IUsuarioService } from "../components/entity/usuario/services/iusuario.service";

export const SERVICES_TOKEN = {
  HTTP: {
    USUARIO: new InjectionToken<IUsuarioService>('SERVICES_TOKEN.HTTP.USUARIO')
  },
  SNACKBAR: new InjectionToken<ISnackbarManagerService>(
    'SNACKBAR_TOKEN.SNACKBAR'
  ),
  DIALOG: new InjectionToken<IDialogManagerService>('SNACKBAR_TOKEN.DIALOG'),
};
