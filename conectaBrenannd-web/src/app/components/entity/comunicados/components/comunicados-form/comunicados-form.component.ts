import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { ComunicadosService } from '../../service/comunicados.service';
import { UsuarioService } from '../../../usuario/services/usuario.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { Usuario } from '../../../usuario/models/usuario.models';
import { IUsuarioService } from '../../../usuario/services/iusuario.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comunicados } from '../../models/comunicados.models';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-comunicados-form',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './comunicados-form.component.html',
  styleUrl: './comunicados-form.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.COMUNICADOS, useClass: ComunicadosService },
    { provide: SERVICES_TOKEN.HTTP.USUARIO, useClass: UsuarioService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class ComunicadosFormComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];

  usuario: Usuario[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.USUARIO)
    private readonly httpServiceSecretaria: IUsuarioService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService,
    private router: Router
  ) {}

  @Input() comunicados: Comunicados = {
    id: 0,
    titulo: '',
    descricao: '',
    dataPostagem: new Date(),
    usuario: new Usuario(),
  };

  @Output() comunicadosSubmited = new EventEmitter<Comunicados>();

  onSubmit() {
    if (NgForm) {
      this.comunicadosSubmited.emit(this.comunicados);
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
    this.router.navigate(['/home']);
  }
}
