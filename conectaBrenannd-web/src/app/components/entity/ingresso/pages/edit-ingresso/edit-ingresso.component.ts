import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { Ingresso, StatusIngresso } from '../../models/ingresso.models';
import { IngressoService } from '../../services/ingresso.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { IIngressoService } from '../../services/iingresso.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../usuario/models/usuario.models';
import { IngressoFormComponent } from '../../components/ingresso-forms/ingresso-forms.component';

@Component({
  selector: 'app-edit-ingresso',
  imports: [IngressoFormComponent],
  templateUrl: './edit-ingresso.component.html',
  styleUrl: './edit-ingresso.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.INGRESSO, useClass: IngressoService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class EditIngressoComponent implements OnInit, OnDestroy {
  private httpsubscriptions: Subscription[] = [];

  ingresso: Ingresso = {
      id: 0,
      usuario: new Usuario(),
      cpfToken: '',
      tipoIngresso: '',
      status: StatusIngresso.ATIVO,
      dataEmissao: new Date(),
      dataUtilizacao: new Date(),
    };

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.INGRESSO)
    private readonly httpService: IIngressoService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informações do ingresso');
      this.router.navigate(['/ingresso/meus']);
      return;
    }
    this.httpsubscriptions.push(
      this.httpService.findByID(Number(id)).subscribe({
        next: (data) => (this.ingresso = data),
        error: () => {
          this.snackBarManager.show('Erro ao buscar o ingresso');
          this.router.navigate(['/ingresso/meus']);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.httpsubscriptions.forEach((s) => s.unsubscribe());
  }

  onSubmitIngresso(value: Ingresso) {
    if (this.ingresso.id) {
      this.httpsubscriptions.push(
        this.httpService.update(this.ingresso.id, value).subscribe({
          next: () => {
            this.snackBarManager.show('Ingresso atualizado com sucesso');
            this.router.navigate(['/ingresso/meus']);
          },
          error: () => {
            this.snackBarManager.show('Erro ao atualizar o ingresso');
          },
        })
      );
    } else {
      this.snackBarManager.show('Um erro inesperado aconteceu');
      this.router.navigate(['/ingresso/meus']);
    }
  }
}
