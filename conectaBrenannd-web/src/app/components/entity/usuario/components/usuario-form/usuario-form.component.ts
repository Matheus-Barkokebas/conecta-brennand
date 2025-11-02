import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { UsuarioService } from '../../services/usuario.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { Permissoes, Usuario } from '../../models/usuario.models';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-usuario-form',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.USUARIO, useClass: UsuarioService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class UsuarioFormComponent implements OnDestroy {
  private httpSubscriptions: Subscription[] = [];

  permissoes = Object.values(Permissoes);

  constructor(
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService
  ) {}

  @Input() usuario: Usuario = {
    id: 0,
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    cpf: '',
    dataNascimento: new Date(),
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    permissao: Permissoes.VISITANTE,
  };

  @Output() usuarioSubmited = new EventEmitter<Usuario>();

  onSubmit(_: NgForm) {
    this.usuarioSubmited.emit(this.usuario);
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }
}
