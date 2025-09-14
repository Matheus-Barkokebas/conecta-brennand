import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioTableComponent } from '../../components/usuario-table/usuario-table.component';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { UsuarioService } from '../../services/usuario.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { Usuario } from '../../models/usuario.models';
import { IUsuarioService } from '../../services/iusuario.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';

@Component({
  selector: 'app-list-usuario',
  imports: [UsuarioTableComponent, MatTabsModule],
  templateUrl: './list-usuario.component.html',
  styleUrl: './list-usuario.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.USUARIO, useClass: UsuarioService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class ListUsuarioComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];

  @Input() usuario: Usuario[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.USUARIO)
    private readonly httpService: IUsuarioService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpService.list().subscribe((data) => (this.usuario = data))
    );
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }

  update(usuario: Usuario) {
    this.router.navigate(['edit/usuario', usuario.id]);
  }

  delete(usuario: Usuario) {
    this.httpSubscriptions.push(
      this.httpService
        .delete(usuario.id)
        .subscribe((_) =>
          this.snackbarManager.show(
            `O usuario ${usuario.nome} foi excluido com sucesso`
          )
        )
    );
  }
}
