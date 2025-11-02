import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { DialogManagerService } from '../../../../../service/ui/dialog-manager.service';
import { Comunicados } from '../../models/comunicados.models';
import { Subscription } from 'rxjs';
import { IDialogManagerService } from '../../../../../service/ui/idialog-manger.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../../service/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { YesNoDialogComponent } from '../../../../commons/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-comunicados-table',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatChipsModule,
    MatTooltipModule,
    MatMenuModule,
    RouterLink
  ],
  templateUrl: './comunicados-table.component.html',
  styleUrls: [
    './comunicados-table.component.scss',
    './comunicados-table-visitante.component.scss',
  ],
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
  ],
})
export class ComunicadosTableComponent {
  @Input() comunicados: Comunicados[] = [];
  @Output() onConfirmDelete = new EventEmitter<Comunicados>();
  @Output() onRequestUpdate = new EventEmitter<Comunicados>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 6;
  pageSizeOptions = [3, 6, 12, 24];
  paginatedComunicados: Comunicados[] = [];
  currentPage = 0;

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
    this.updatePaginatedComunicados();
    this.checkScreenSize();

    this.subscriptions.add(
      this.authService.userRole$.subscribe((role) => (this.permissao = role))
    );
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

  ngOnDestroy(): void {
    this.dialogManagerServiceSubscriptions?.unsubscribe();
  }

  ngOnChanges() {
    this.updatePaginatedComunicados();
  }

  private updatePaginatedComunicados() {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedComunicados = this.comunicados.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedComunicados();
  }

  update(comunicados: Comunicados) {
    this.onRequestUpdate.emit(comunicados);
  }

  delete(comunicados: Comunicados) {
    this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão do Comunicado',
        content: `Confirma a exclusão do Comunicado ${comunicados.usuario.nome}? com o CPF: ${comunicados.usuario.cpf}`,
      })
      .subscribe((result) => {
        if (result) {
          this.onConfirmDelete.emit(comunicados);
        }
      });
  }

  onBack() {
    this.router.navigate(['/home']);
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
