import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ComunicadosService } from '../../service/comunicados.service';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ComunicadosTableComponent } from '../../components/comunicados-table/comunicados-table.component';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { Comunicados } from '../../models/comunicados.models';
import { IComunicadosService } from '../../service/icomunicados.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-comunicados',
  imports: [CommonModule, MatTabsModule, ComunicadosTableComponent],
  templateUrl: './list-comunicados.component.html',
  styleUrl: './list-comunicados.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.COMUNICADOS, useClass: ComunicadosService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class ListComunicadosComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];
  comunicados: Comunicados[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.COMUNICADOS)
    private readonly httpService: IComunicadosService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpService.list().subscribe((data) => (this.comunicados = data))
    );
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }

  update(comunicados: Comunicados) {
    this.router.navigate(['/comunicados/edit', comunicados.id]);
  }

  delete(comunicados: Comunicados) {
    this.httpSubscriptions.push(
      this.httpService
        .delete(comunicados.id)
        .subscribe((_) =>
          this.snackbarManager.show(
            `O comunicado ${comunicados.usuario.nome} foi excluido com sucesso`
          )
        )
    );
  }
}
