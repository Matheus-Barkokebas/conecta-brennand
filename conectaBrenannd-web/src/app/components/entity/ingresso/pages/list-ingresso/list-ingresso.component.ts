import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { IIngressoService } from '../../services/iingresso.service';
import { IngressoService } from '../../services/ingresso.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { Ingresso } from '../../models/ingresso.models';
import { IngressoTableComponent } from '../../components/ingresso-table/ingresso-table.component';

@Component({
  selector: 'app-list-ingresso',
  standalone: true,
  imports: [CommonModule, MatTabsModule, IngressoTableComponent],
  templateUrl: './list-ingresso.component.html',
  styleUrls: ['./list-ingresso.component.scss'],
  providers: [
    { provide: SERVICES_TOKEN.HTTP.INGRESSO, useClass: IngressoService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class ListIngressoComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];
  ingresso: Ingresso[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.INGRESSO)
    private readonly httpService: IIngressoService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpService.listByUser().subscribe({
        next: (data) => (this.ingresso = data),
        error: (err) => console.error('Erro ao carregar ingressos', err),
      })
    );
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }

  update(ingresso: Ingresso) {
    this.router.navigate(['/ingresso/edit', ingresso.id]);
  }

  delete(ingresso: Ingresso) {
    this.httpSubscriptions.push(
      this.httpService
        .delete(ingresso.id)
        .subscribe((_) =>
          this.snackbarManager.show(
            `O evento ${ingresso.usuario.nome} foi excluido com sucesso`
          )
        )
    );
  }
}
