import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-dependente-table',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './dependente-table.component.html',
  styleUrl: './dependente-table.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
  ],
})
export class DependenteTableComponent {
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

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG)
    private readonly dialogManagerService: IDialogManagerService,
    private router: Router
  ) {}

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
    this.router.navigate(['/home']);
  }
}
