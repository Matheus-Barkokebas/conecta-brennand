import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { GrupoService } from '../../../grupo/services/grupo.service';
import { UsuarioService } from '../../../usuario/services/usuario.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { DependenteService } from '../../services/dependente.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Grupo, TipoGrupo } from '../../../grupo/models/grupo.models';
import { Usuario } from '../../../usuario/models/usuario.models';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { Router, RouterLink } from '@angular/router';
import { IUsuarioService } from '../../../usuario/services/iusuario.service';
import { IGrupoService } from '../../../grupo/services/igrupo.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Dependente } from '../../models/dependente.models';
import { AuthService } from '../../../../../service/auth/auth.service';

@Component({
  selector: 'app-dependente-forms',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './dependente-forms.component.html',
  styleUrls: [
    './dependente-forms.component.scss',
    './dependente-forms-visitante.component.scss',
  ],
  providers: [
    { provide: SERVICES_TOKEN.HTTP.DEPENDENTE, useClass: DependenteService },
    { provide: SERVICES_TOKEN.HTTP.GRUPO, useClass: GrupoService },
    { provide: SERVICES_TOKEN.HTTP.USUARIO, useClass: UsuarioService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class DependenteFormsComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];

  grupo: Grupo[] = [];

  usuario: Usuario[] = [];

  public TipoGrupo = TipoGrupo;

  sidebarVisible = true;
  isMobile = false;

  permissao: string | null = null;
  isLoggedIn: boolean = false;
  private subscriptions = new Subscription();
  mobileMenuOpen = false;

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.GRUPO)
    private readonly httpServiceGrupo: IGrupoService,
    @Inject(SERVICES_TOKEN.HTTP.USUARIO)
    private readonly httpServiceSecretaria: IUsuarioService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService,
    private router: Router,
    private authService: AuthService
  ) {}

  @Input() dependente: Dependente = {
    id: 0,
    nome: '',
    idade: 0,
    parentesco: '',
    cpf: '',
    grupo: new Grupo(),
    usuario: new Usuario(),
  };

  @Output() dependenteSubmited = new EventEmitter<Dependente>();

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.snackbarManager.show(
        'Por favor, preencha todos os campos obrigatórios!'
      );
      return;
    }

    if (!this.dependente.grupo || !this.dependente.grupo.id) {
      this.snackbarManager.show('Selecione um grupo antes de salvar!');
      return;
    }

    console.log('Dependente enviado:', this.dependente);

    this.dependenteSubmited.emit(this.dependente);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();

    this.subscriptions.add(
      this.authService.userRole$.subscribe((role) => (this.permissao = role))
    );

    const subUsuarios = this.httpServiceSecretaria.list().subscribe({
      next: (data) => (this.usuario = data),
      error: () => this.snackbarManager.show('Erro ao carregar usuários.'),
    });
    this.httpSubscriptions.push(subUsuarios);

    const subGrupos = this.httpServiceGrupo.list().subscribe({
      next: (data) => (this.grupo = data),
      error: () => this.snackbarManager.show('Erro ao carregar grupos.'),
    });
    this.httpSubscriptions.push(subGrupos);
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }

  onBack() {
    this.router.navigate(['/grupos/meus']);
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.sidebarVisible = false;
    } else {
      this.sidebarVisible = true;
      this.mobileMenuOpen = false;
    }
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  closeSidebarOnMobile() {
    if (this.isMobile) {
      this.sidebarVisible = false;
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
