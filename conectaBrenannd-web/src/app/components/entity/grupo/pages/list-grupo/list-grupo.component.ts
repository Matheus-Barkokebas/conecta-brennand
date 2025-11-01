import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { GrupoService } from '../../services/grupo.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { Grupo } from '../../models/grupo.models';
import { IGrupoService } from '../../services/igrupo.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { Router } from '@angular/router';
import { GrupoTableComponent } from '../../components/grupo-table/grupo-table.component';

@Component({
  selector: 'app-list-grupo',
  imports: [CommonModule, MatTabsModule, GrupoTableComponent],
  templateUrl: './list-grupo.component.html',
  styleUrl: './list-grupo.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.GRUPO, useClass: GrupoService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class ListGrupoComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];
  grupo: Grupo[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.GRUPO)
    private readonly httpService: IGrupoService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpService.listByUser().subscribe({
        next: (data) => (this.grupo = data),
        error: (err) => console.error('Erro ao carregar grupo', err),
      })
    );
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }

  update(grupo: Grupo) {
    this.router.navigate(['/grupos/edit', grupo.id]);
  }

  delete(grupo: Grupo) {
    this.httpSubscriptions.push(
      this.httpService
        .delete(grupo.id)
        .subscribe((_) =>
          this.snackbarManager.show(
            `O grupo ${grupo.nome} foi excluido com sucesso`
          )
        )
    );
  }
}
