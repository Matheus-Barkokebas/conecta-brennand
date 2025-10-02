import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { Subscription } from 'rxjs';

import { Ingresso, StatusIngresso } from '../../models/ingresso.models';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { IDialogManagerService } from '../../../../../service/ui/idialog-manger.service';
import { AuthService } from '../../../../../service/auth/auth.service';
import { YesNoDialogComponent } from '../../../../commons/yes-no-dialog/yes-no-dialog.component';
import { DialogManagerService } from '../../../../../service/ui/dialog-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresso-table',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatChipsModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  templateUrl: './ingresso-table.component.html',
  styleUrl: './ingresso-table.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
  ],
})
export class IngressoTableComponent {
  @Input() ingressos: Ingresso[] = [];
  @Output() onConfirmDelete = new EventEmitter<Ingresso>();
  @Output() onRequestUpdate = new EventEmitter<Ingresso>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 6;
  pageSizeOptions = [3, 6, 12, 24];
  paginatedIngressos: Ingresso[] = [];
  currentPage = 0;

  private dialogManagerServiceSubscriptions?: Subscription;

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG)
    private readonly dialogManagerService: IDialogManagerService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updatePaginatedIngressos();
  }

  ngOnDestroy(): void {
    this.dialogManagerServiceSubscriptions?.unsubscribe();
  }

  ngOnChanges() {
    this.updatePaginatedIngressos();
  }

  private updatePaginatedIngressos() {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedIngressos = this.ingressos.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedIngressos();
  }

  update(ingresso: Ingresso) {
    this.onRequestUpdate.emit(ingresso);
  }

  delete(ingresso: Ingresso) {
    this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão do ingresso',
        content: `Confirma a exclusão do ingresso ${ingresso.usuario.nome}? com o CPF: ${ingresso.usuario.cpf}`,
      })
      .subscribe((result) => {
        if (result) {
          this.onConfirmDelete.emit(ingresso);
        }
      });
  }

  formatCpf(cpf: string): string {
    if (!cpf) return '';
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }

  shareIngresso(ingresso: Ingresso) {
    // dps implementar logica para compartilhamento
    console.log('Compartilhar ingresso:', ingresso);
  }

  downloadIngresso(ingresso: Ingresso) {
    // dps implementar logica para download
    console.log('Download ingresso:', ingresso);
  }

    onBack(){
    this.router.navigate(['/home']);
  }
}
