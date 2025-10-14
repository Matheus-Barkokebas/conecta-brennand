import { InjectionToken } from "@angular/core";
import { ISnackbarManagerService } from "./ui/isnackbar-manager.service";
import { IDialogManagerService } from "./ui/idialog-manger.service";
import { IUsuarioService } from "../components/entity/usuario/services/iusuario.service";
import { IIngressoService } from "../components/entity/ingresso/services/iingresso.service";
import { IGrupoService } from "../components/entity/grupo/services/igrupo.service";

export const SERVICES_TOKEN = {
  HTTP: {
    USUARIO: new InjectionToken<IUsuarioService>('SERVICES_TOKEN.HTTP.USUARIO'),
    INGRESSO: new InjectionToken<IIngressoService>('SERVICES_TOKEN.HTTP.INGRESSO'),
    GRUPO: new InjectionToken<IGrupoService>('SERVICES_TOKEN.HTTP.GRUPO'),
  },
  SNACKBAR: new InjectionToken<ISnackbarManagerService>(
    'SNACKBAR_TOKEN.SNACKBAR'
  ),
  DIALOG: new InjectionToken<IDialogManagerService>('SNACKBAR_TOKEN.DIALOG'),
};
