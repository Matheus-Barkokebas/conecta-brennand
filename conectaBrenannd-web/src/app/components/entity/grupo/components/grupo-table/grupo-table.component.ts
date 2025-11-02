import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { DialogManagerService } from '../../../../../service/ui/dialog-manager.service';
import { Grupo } from '../../models/grupo.models';
import { Subscription } from 'rxjs';
import { IDialogManagerService } from '../../../../../service/ui/idialog-manger.service';
import { YesNoDialogComponent } from '../../../../commons/yes-no-dialog/yes-no-dialog.component';
import { AuthService } from '../../../../../service/auth/auth.service';

@Component({
  selector: 'app-grupo-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterLink,
  ],
  templateUrl: './grupo-table.component.html',
  styleUrls: [
    './grupo-table.component.scss',
    './grupo-table-visitante.component.scss',
  ],
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
  ],
})
export class GrupoTableComponent implements OnInit {
  @Input() grupos: Grupo[] = [];
  @Output() onConfirmDelete = new EventEmitter<Grupo>();
  @Output() onRequestUpdate = new EventEmitter<Grupo>();

  displayedColumns: string[] = [
    'id',
    'nome',
    'tipoGrupo',
    'usuario',
    'actions',
  ];

  private dialogManagerServiceSubscriptions?: Subscription;

  sidebarVisible = true;
  isMobile = false;

  permissao: string | null = null;
  isLoggedIn: boolean = false;
  private subscriptions = new Subscription();
  mobileMenuOpen = false;

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG)
    private readonly dialogManagerService: IDialogManagerService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkScreenSize();

    this.subscriptions.add(
      this.authService.userRole$.subscribe((role) => (this.permissao = role))
    );
  }

  ngOnDestroy(): void {
    this.dialogManagerServiceSubscriptions?.unsubscribe();
  }

  update(grupo: Grupo) {
    this.onRequestUpdate.emit(grupo);
  }

  delete(grupo: Grupo) {
    this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão do grupo',
        content: `Confirma a exclusão do grupo "${grupo.nome}"?`,
      })
      .subscribe((result) => {
        if (result) {
          this.onConfirmDelete.emit(grupo);
        }
      });
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
