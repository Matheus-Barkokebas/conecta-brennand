import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DependenteTableComponent } from '../../components/dependente-table/dependente-table.component';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { DependenteService } from '../../services/dependente.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { IDependenteService } from '../../services/idependente.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { Router } from '@angular/router';
import { Dependente } from '../../models/dependente.models';

@Component({
  selector: 'app-list-dependente',
  imports: [CommonModule, MatTabsModule, DependenteTableComponent],
  templateUrl: './list-dependente.component.html',
  styleUrl: './list-dependente.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.DEPENDENTE, useClass: DependenteService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class ListDependenteComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];
  dependente: Dependente[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.DEPENDENTE)
    private readonly httpService: IDependenteService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpService.listByUser().subscribe({
        next: (data) => (this.dependente = data),
        error: (err) => console.error('Erro ao carregar dependente', err),
      })
    );
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }

  update(dependente: Dependente) {
    this.router.navigate(['/dependentes/edit', dependente.id]);
  }

  delete(dependente: Dependente) {
    this.httpSubscriptions.push(
      this.httpService
        .delete(dependente.id)
        .subscribe((_) =>
          this.snackbarManager.show(
            `O dependente ${dependente.nome} foi excluido com sucesso`
          )
        )
    );
  }
}
