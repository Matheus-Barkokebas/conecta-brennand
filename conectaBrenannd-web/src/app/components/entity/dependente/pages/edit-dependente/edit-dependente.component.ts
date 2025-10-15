import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DependenteFormsComponent } from '../../components/dependente-forms/dependente-forms.component';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { DependenteService } from '../../services/dependente.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { Grupo } from '../../../grupo/models/grupo.models';
import { Usuario } from '../../../usuario/models/usuario.models';
import { IDependenteService } from '../../services/idependente.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dependente } from '../../models/dependente.models';

@Component({
  selector: 'app-edit-dependente',
  imports: [DependenteFormsComponent],
  templateUrl: './edit-dependente.component.html',
  styleUrl: './edit-dependente.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.DEPENDENTE, useClass: DependenteService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class EditDependenteComponent implements OnInit, OnDestroy {
  private httpsubscriptions: Subscription[] = [];

  dependente: Dependente = {
    id: 0,
    nome: '',
    idade: 0,
    parentesco: '',
    cpf: '',
    grupo: new Grupo(),
    usuario: new Usuario(),
  };

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.DEPENDENTE)
    private readonly httpService: IDependenteService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informações do DEPENDENTE');
      this.router.navigate(['/dependentes/meus']);
      return;
    }
    this.httpsubscriptions.push(
      this.httpService.findByID(Number(id)).subscribe({
        next: (data) => (this.dependente = data),
        error: () => {
          this.snackBarManager.show('Erro ao buscar o DEPENDENTE');
          this.router.navigate(['/dependentes/meus']);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.httpsubscriptions.forEach((s) => s.unsubscribe());
  }

  onSubmitDependente(value: Dependente) {
    if (this.dependente.id) {
      this.httpsubscriptions.push(
        this.httpService.update(this.dependente.id, value).subscribe({
          next: () => {
            this.snackBarManager.show('Dependente atualizado com sucesso');
            this.router.navigate(['/dependentes/meus']);
          },
          error: () => {
            this.snackBarManager.show('Erro ao atualizar o dependente');
          },
        })
      );
    } else {
      this.snackBarManager.show('Um erro inesperado aconteceu');
      this.router.navigate(['/dependentes/meus']);
    }
  }
}
