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
import { DialogManagerService } from '../../../../../service/ui/dialog-manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { IDialogManagerService } from '../../../../../service/ui/idialog-manger.service';
import { YesNoDialogComponent } from '../../../../commons/yes-no-dialog/yes-no-dialog.component';
import { Dependente } from '../../models/dependente.models';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../service/auth/auth.service';

@Component({
  selector: 'app-dependente-table',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterLink,
  ],
  templateUrl: './dependente-table.component.html',
  styleUrls: [
    './dependente-table.component.scss',
    './dependente-table-visitante.component.scss',
  ],
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
  ],
})
export class DependenteTableComponent implements OnInit, OnDestroy {
  @Input() dependentes: Dependente[] = [];
  @Output() onConfirmDelete = new EventEmitter<Dependente>();
  @Output() onRequestUpdate = new EventEmitter<Dependente>();

  displayedColumns: string[] = [
    'id',
    'nome',
    'idade',
    'parentesco',
    'cpf',
    'token',
    'grupo',
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

  update(dependente: Dependente) {
    this.onRequestUpdate.emit(dependente);
  }

  delete(dependente: Dependente) {
    this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão do grupo',
        content: `Confirma a exclusão do grupo "${dependente.nome}"?`,
      })
      .subscribe((result) => {
        if (result) {
          this.onConfirmDelete.emit(dependente);
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
