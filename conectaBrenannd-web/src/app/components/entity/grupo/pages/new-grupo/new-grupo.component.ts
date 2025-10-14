import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { GrupoService } from '../../services/grupo.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { IGrupoService } from '../../services/igrupo.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { Grupo } from '../../models/grupo.models';
import { GrupoFormsComponent } from '../../components/grupo-forms/grupo-forms.component';

@Component({
  selector: 'app-new-grupo',
  imports: [GrupoFormsComponent],
  templateUrl: './new-grupo.component.html',
  styleUrl: './new-grupo.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.GRUPO, useClass: GrupoService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class NewGrupoComponent implements OnDestroy {
  private httpSubscription?: Subscription;

  @Output() grupoSubmited = new EventEmitter();

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.GRUPO)
    private readonly httpService: IGrupoService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitGrupo(value: Grupo) {
    this.httpSubscription = this.httpService.save(value).subscribe((_) => {
      this.snackBarManager.show('Grupo criado com sucesso');
      this.grupoSubmited.emit();
    });
  }
}
