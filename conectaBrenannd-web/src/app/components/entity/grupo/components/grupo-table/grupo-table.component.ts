import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Inject, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";
import { SERVICES_TOKEN } from "../../../../../service/service.token";
import { DialogManagerService } from "../../../../../service/ui/dialog-manager.service";
import { Grupo } from "../../models/grupo.models";
import { Subscription } from "rxjs";
import { IDialogManagerService } from "../../../../../service/ui/idialog-manger.service";
import { YesNoDialogComponent } from "../../../../commons/yes-no-dialog/yes-no-dialog.component";

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
    RouterLink
],
  templateUrl: './grupo-table.component.html',
  styleUrl: './grupo-table.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
  ],
})
export class GrupoTableComponent {
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

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG)
    private readonly dialogManagerService: IDialogManagerService
  ) {}

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
}
