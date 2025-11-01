import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { PesquisaService } from '../../services/pesquisa.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { IPesquisaService } from '../../services/ipesquisa.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { Pesquisa } from '../../models/pesquisa.models';
import { PesquisaFormComponent } from '../../components/pesquisa-form/pesquisa-form.component';

@Component({
  selector: 'app-new-pesquisa',
  imports: [PesquisaFormComponent],
  templateUrl: './new-pesquisa.component.html',
  styleUrl: './new-pesquisa.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.PESQUISA, useClass: PesquisaService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class NewPesquisaComponent implements OnDestroy {
  private httpSubscription?: Subscription;

  @Output() pesquisaSubmited = new EventEmitter();

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.PESQUISA)
    private readonly httpService: IPesquisaService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitPesquisa(value: Pesquisa) {
    this.httpSubscription = this.httpService.save(value).subscribe((_) => {
      this.snackBarManager.show('Pesquisa criada com sucesso');
      this.pesquisaSubmited.emit();
    });
  }
}
