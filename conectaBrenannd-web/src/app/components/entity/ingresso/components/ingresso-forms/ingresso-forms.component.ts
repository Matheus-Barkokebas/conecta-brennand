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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';

import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { IngressoService } from '../../services/ingresso.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { Ingresso, StatusIngresso } from '../../models/ingresso.models';
import { Usuario } from '../../../usuario/models/usuario.models';
import { UsuarioService } from '../../../usuario/services/usuario.service';
import { IUsuarioService } from '../../../usuario/services/iusuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresso-form',
  standalone: true,
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
],
  templateUrl: './ingresso-forms.component.html',
  styleUrl: './ingresso-forms.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.INGRESSO, useClass: IngressoService },
    { provide: SERVICES_TOKEN.HTTP.USUARIO, useClass: UsuarioService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class IngressoFormComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];

  usuario: Usuario[] = [];

   constructor(
    @Inject(SERVICES_TOKEN.HTTP.USUARIO)
    private readonly httpServiceSecretaria: IUsuarioService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService,
    private router: Router
  ) {}

   @Input() ingresso: Ingresso = {
    id: 0,
    usuario: new Usuario(),
    cpfToken: '',
    tipoIngresso: '',
    status: StatusIngresso.ATIVO,
    dataEmissao: new Date(),
    dataUtilizacao: new Date(),
  };

   @Output() ingressoSubmited = new EventEmitter<Ingresso>();

  onSubmit() {
    if (NgForm) {
      this.ingressoSubmited.emit(this.ingresso);
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

  onBack(){
    this.router.navigate(['/home']);
  }
}
