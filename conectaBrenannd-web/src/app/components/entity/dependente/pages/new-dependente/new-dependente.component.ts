import { Component, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { DependenteService } from '../../services/dependente.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { DependenteFormsComponent } from '../../components/dependente-forms/dependente-forms.component';
import { Subscription } from 'rxjs';
import { IDependenteService } from '../../services/idependente.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { Dependente } from '../../models/dependente.models';

@Component({
  selector: 'app-new-dependente',
  imports: [DependenteFormsComponent],
  templateUrl: './new-dependente.component.html',
  styleUrl: './new-dependente.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.DEPENDENTE, useClass: DependenteService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class NewDependenteComponent implements OnDestroy {
  private httpSubscription?: Subscription;

  @Output() dependenteSubmited = new EventEmitter();

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.DEPENDENTE)
    private readonly httpService: IDependenteService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitDependente(value: Dependente) {
    this.httpSubscription = this.httpService.save(value).subscribe((_) => {
      this.snackBarManager.show('Dependente cadastrado com sucesso');
      this.dependenteSubmited.emit();
    });
  }
}
