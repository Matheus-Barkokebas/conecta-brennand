import { InjectionToken } from "@angular/core";
import { ISnackbarManagerService } from "./ui/isnackbar-manager.service";
import { IDialogManagerService } from "./ui/idialog-manger.service";
import { IUsuarioService } from "../components/entity/usuario/services/iusuario.service";
import { IIngressoService } from "../components/entity/ingresso/services/iingresso.service";
import { IGrupoService } from "../components/entity/grupo/services/igrupo.service";
import { IDependenteService } from "../components/entity/dependente/services/idependente.service";
import { IComunicadosService } from "../components/entity/comunicados/service/icomunicados.service";
import { IPesquisaService } from "../components/entity/pesquisa/services/ipesquisa.service";

export const SERVICES_TOKEN = {
  HTTP: {
    USUARIO: new InjectionToken<IUsuarioService>('SERVICES_TOKEN.HTTP.USUARIO'),
    INGRESSO: new InjectionToken<IIngressoService>('SERVICES_TOKEN.HTTP.INGRESSO'),
    GRUPO: new InjectionToken<IGrupoService>('SERVICES_TOKEN.HTTP.GRUPO'),
    DEPENDENTE: new InjectionToken<IDependenteService>('SERVICES_TOKEN.HTTP.DEPENDENTE'),
    COMUNICADOS: new InjectionToken<IComunicadosService>('SERVICES_TOKEN.HTTP.COMUNICADOS'),
    PESQUISA: new InjectionToken<IPesquisaService>('SERVICES_TOKEN.HTTP.PESQUISA'),
  },
  SNACKBAR: new InjectionToken<ISnackbarManagerService>(
    'SNACKBAR_TOKEN.SNACKBAR'
  ),
  DIALOG: new InjectionToken<IDialogManagerService>('SNACKBAR_TOKEN.DIALOG'),
};
