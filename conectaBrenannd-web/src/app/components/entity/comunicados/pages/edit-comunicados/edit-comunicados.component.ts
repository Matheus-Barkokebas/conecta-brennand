import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ComunicadosFormComponent } from '../../components/comunicados-form/comunicados-form.component';
import { ComunicadosService } from '../../service/comunicados.service';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { Comunicados } from '../../models/comunicados.models';
import { Usuario } from '../../../usuario/models/usuario.models';
import { IComunicadosService } from '../../service/icomunicados.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-comunicados',
  imports: [ComunicadosFormComponent],
  templateUrl: './edit-comunicados.component.html',
  styleUrl: './edit-comunicados.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.COMUNICADOS, useClass: ComunicadosService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class EditComunicadosComponent implements OnInit, OnDestroy {
  private httpsubscriptions: Subscription[] = [];

  comunicados: Comunicados = {
    id: 0,
    titulo: '',
    descricao: '',
    dataPostagem: new Date(),
    usuario: new Usuario(),
  };

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.COMUNICADOS)
    private readonly httpService: IComunicadosService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informações do comunicado');
      this.router.navigate(['/comunicados/list']);
      return;
    }
    this.httpsubscriptions.push(
      this.httpService.findByID(Number(id)).subscribe({
        next: (data) => (this.comunicados = data),
        error: () => {
          this.snackBarManager.show('Erro ao buscar o comunicado');
          this.router.navigate(['/comunicados/list']);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.httpsubscriptions.forEach((s) => s.unsubscribe());
  }

  onSubmitComunicado(value: Comunicados) {
    if (this.comunicados.id) {
      this.httpsubscriptions.push(
        this.httpService.update(this.comunicados.id, value).subscribe({
          next: () => {
            this.snackBarManager.show('Comunicado atualizado com sucesso');
            this.router.navigate(['/comunicados/meus']);
          },
          error: () => {
            this.snackBarManager.show('Erro ao atualizar o Comunicado');
          },
        })
      );
    } else {
      this.snackBarManager.show('Um erro inesperado aconteceu');
      this.router.navigate(['/comunicados/meus']);
    }
  }
}
