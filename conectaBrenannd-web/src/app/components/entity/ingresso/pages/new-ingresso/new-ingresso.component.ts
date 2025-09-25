import { Component, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { IngressoService } from '../../services/ingresso.service';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { IIngressoService } from '../../services/iingresso.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { Ingresso } from '../../models/ingresso.models';
import { IngressoFormComponent } from "../../components/ingresso-forms/ingresso-forms.component";

@Component({
  selector: 'app-new-ingresso',
  imports: [IngressoFormComponent],
  templateUrl: './new-ingresso.component.html',
  styleUrl: './new-ingresso.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.INGRESSO, useClass: IngressoService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class NewIngressoComponent implements OnDestroy {
  private httpSubscription?: Subscription;

  @Output() ingressoSubmited = new EventEmitter();

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.INGRESSO)
    private readonly httpService: IIngressoService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitIngresso(value: Ingresso) {
    this.httpSubscription = this.httpService.save(value).subscribe((_) => {
      this.snackBarManager.show('Ingressp criado com sucesso');
      this.ingressoSubmited.emit();
    });
  }
}
