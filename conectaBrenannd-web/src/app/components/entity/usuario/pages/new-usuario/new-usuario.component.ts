import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioFormComponent } from '../../components/usuario-form/usuario-form.component';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { UsuarioService } from '../../services/usuario.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { IUsuarioService } from '../../services/iusuario.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-new-usuario',
  imports: [UsuarioFormComponent],
  templateUrl: './new-usuario.component.html',
  styleUrl: './new-usuario.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.USUARIO, useClass: UsuarioService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class NewUsuarioComponent implements OnDestroy {
  private httpSubscription?: Subscription;

  @Output() savedUser = new EventEmitter();

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.USUARIO)
    private readonly httpService: IUsuarioService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitUsuario(value: Usuario) {
    this.httpSubscription = this.httpService.save(value).subscribe((_) => {
      this.snackBarManager.show('usuario cadastrado com sucesso');

      this.savedUser.emit();
    });
  }
}
