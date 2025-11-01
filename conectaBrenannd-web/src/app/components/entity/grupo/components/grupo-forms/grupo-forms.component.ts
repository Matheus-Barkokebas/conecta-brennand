import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { GrupoService } from '../../services/grupo.service';
import { UsuarioService } from '../../../usuario/services/usuario.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { Router } from '@angular/router';
import { IUsuarioService } from '../../../usuario/services/iusuario.service';
import { Grupo, TipoGrupo } from '../../models/grupo.models';
import { Usuario } from '../../../usuario/models/usuario.models';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-grupo-forms',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './grupo-forms.component.html',
  styleUrl: './grupo-forms.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.GRUPO, useClass: GrupoService },
    { provide: SERVICES_TOKEN.HTTP.USUARIO, useClass: UsuarioService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class GrupoFormsComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];

  public TipoGrupo = TipoGrupo;

  usuario: Usuario[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.USUARIO)
    private readonly httpServiceSecretaria: IUsuarioService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService,
    private router: Router
  ) {}

  @Input() grupo: Grupo = {
    id: 0,
    nome: '',
    tipoGrupo: TipoGrupo.AMIGOS,
    usuario: new Usuario(),
  };

  @Output() grupoSubmited = new EventEmitter<Grupo>();

  onSubmit() {
    if (NgForm) {
      this.grupoSubmited.emit(this.grupo);
    } else {
      this.snackbarManager.show(
        'Por favor, preencha todos os campos obrigatórios!'
      );
    }
  }

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpServiceSecretaria
        .list()
        .subscribe((data) => (this.usuario = data))
    );
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }

  onBack() {
    this.router.navigate(['/grupos/homeGrupos']);
  }
}
