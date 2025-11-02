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
import { GrupoService } from '../../services/grupo.service';
import { UsuarioService } from '../../../usuario/services/usuario.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { Router, RouterLink } from '@angular/router';
import { IUsuarioService } from '../../../usuario/services/iusuario.service';
import { Grupo, TipoGrupo } from '../../models/grupo.models';
import { Usuario } from '../../../usuario/models/usuario.models';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../../service/auth/auth.service';

@Component({
  selector: 'app-grupo-forms',
  imports: [CommonModule, FormsModule, MatIconModule, RouterLink],
  templateUrl: './grupo-forms.component.html',
  styleUrls: [
    './grupo-forms.component.scss',
    './grupo-forms-visitante.component.scss',
  ],
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

  sidebarVisible = true;
  isMobile = false;

  permissao: string | null = null;
  isLoggedIn: boolean = false;
  private subscriptions = new Subscription();
  mobileMenuOpen = false;

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.USUARIO)
    private readonly httpServiceSecretaria: IUsuarioService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService,
    private router: Router,
    private authService: AuthService
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

    this.checkScreenSize();

    this.subscriptions.add(
      this.authService.userRole$.subscribe((role) => (this.permissao = role))
    );
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }

  onBack() {
    this.router.navigate(['/grupos/homeGrupos']);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
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
