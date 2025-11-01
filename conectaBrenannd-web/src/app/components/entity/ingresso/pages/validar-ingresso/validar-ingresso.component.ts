import { Component } from '@angular/core';
import { IngressoService } from '../../services/ingresso.service';
import { ValidacaoIngressoResponse } from '../../models/ingresso.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-validar-ingresso',
  imports: [CommonModule, FormsModule],
  templateUrl: './validar-ingresso.component.html',
  styleUrl: './validar-ingresso.component.scss',
})
export class ValidarIngressoComponent {
  cpfToken: string = '';
  resposta?: ValidacaoIngressoResponse;
  errorMsg?: string;

  constructor(private ingressoService: IngressoService) {}

  validar() {
    this.resposta = undefined;
    this.errorMsg = undefined;

    this.ingressoService.validarIngresso(this.cpfToken).subscribe({
      next: (res) => {
        this.resposta = res;
      },
      error: (err) => {
        this.errorMsg = err.error?.mensagem || 'Erro ao validar ingresso.';
      },
    });
  }
}
