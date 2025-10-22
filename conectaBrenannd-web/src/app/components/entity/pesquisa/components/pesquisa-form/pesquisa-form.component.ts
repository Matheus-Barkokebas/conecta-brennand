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
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { UsuarioService } from '../../../usuario/services/usuario.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { PesquisaService } from '../../services/pesquisa.service';
import { Subscription } from 'rxjs';
import { IUsuarioService } from '../../../usuario/services/iusuario.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../usuario/models/usuario.models';
import { Pesquisa } from '../../models/pesquisa.models';
import { MatCard } from '@angular/material/card';
@Component({
  selector: 'app-pesquisa-form',
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
    MatCard
  ],
  templateUrl: './pesquisa-form.component.html',
  styleUrl: './pesquisa-form.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.PESQUISA, useClass: PesquisaService },
    { provide: SERVICES_TOKEN.HTTP.USUARIO, useClass: UsuarioService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class PesquisaFormComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];
  usuario: Usuario[] = [];
  constructor(
    @Inject(SERVICES_TOKEN.HTTP.USUARIO)
    private readonly httpServiceSecretaria: IUsuarioService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService,
    private router: Router
  ) {}
  @Input() pesquisa: Pesquisa = {
    id: 0,
    descricao: '',
    estrelas: 0,
    usuario: new Usuario(),
  };
  @Output() pesquisaSubmited = new EventEmitter<Pesquisa>();
  onSubmit() {
    if (NgForm) {
      this.pesquisaSubmited.emit(this.pesquisa);
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
