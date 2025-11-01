import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Grupo, TipoGrupo } from '../../models/grupo.models';
import { Usuario } from '../../../usuario/models/usuario.models';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { GrupoService } from '../../services/grupo.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { IGrupoService } from '../../services/igrupo.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoFormsComponent } from '../../components/grupo-forms/grupo-forms.component';

@Component({
  selector: 'app-edit-grupo',
  imports: [GrupoFormsComponent],
  templateUrl: './edit-grupo.component.html',
  styleUrl: './edit-grupo.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.GRUPO, useClass: GrupoService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class EditGrupoComponent implements OnInit, OnDestroy {
  private httpsubscriptions: Subscription[] = [];

  grupo: Grupo = {
    id: 0,
    nome: '',
    tipoGrupo: TipoGrupo.AMIGOS,
    usuario: new Usuario(),
  };

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.GRUPO)
    private readonly httpService: IGrupoService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informações do GRUPO');
      this.router.navigate(['/grupos/meus']);
      return;
    }
    this.httpsubscriptions.push(
      this.httpService.findByID(Number(id)).subscribe({
        next: (data) => (this.grupo = data),
        error: () => {
          this.snackBarManager.show('Erro ao buscar o GRUPO');
          this.router.navigate(['/grupos/meus']);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.httpsubscriptions.forEach((s) => s.unsubscribe());
  }

  onSubmitGrupo(value: Grupo) {
    if (this.grupo.id) {
      this.httpsubscriptions.push(
        this.httpService.update(this.grupo.id, value).subscribe({
          next: () => {
            this.snackBarManager.show('Grupo atualizado com sucesso');
            this.router.navigate(['/grupos/meus']);
          },
          error: () => {
            this.snackBarManager.show('Erro ao atualizar o grupo');
          },
        })
      );
    } else {
      this.snackBarManager.show('Um erro inesperado aconteceu');
      this.router.navigate(['/grupos/meus']);
    }
  }
}
