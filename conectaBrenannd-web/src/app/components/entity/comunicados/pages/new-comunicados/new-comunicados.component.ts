import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { ComunicadosFormComponent } from '../../components/comunicados-form/comunicados-form.component';
import { ComunicadosService } from '../../service/comunicados.service';
import { SnackbarManagerService } from '../../../../../service/ui/snackbar-manager.service';
import { SERVICES_TOKEN } from '../../../../../service/service.token';
import { Subscription } from 'rxjs';
import { IComunicadosService } from '../../service/icomunicados.service';
import { ISnackbarManagerService } from '../../../../../service/ui/isnackbar-manager.service';
import { Comunicados } from '../../models/comunicados.models';

@Component({
  selector: 'app-new-comunicados',
  imports: [ComunicadosFormComponent],
  templateUrl: './new-comunicados.component.html',
  styleUrl: './new-comunicados.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.COMUNICADOS, useClass: ComunicadosService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class NewComunicadosComponent implements OnDestroy {
  private httpSubscription?: Subscription;

  @Output() comunicadosSubmited = new EventEmitter();

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.COMUNICADOS)
    private readonly httpService: IComunicadosService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitComunicado(value: Comunicados) {
    this.httpSubscription = this.httpService.save(value).subscribe((_) => {
      this.snackBarManager.show('Comunicado criado com sucesso');
      this.comunicadosSubmited.emit();
    });
  }
}
