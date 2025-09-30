// src/app/pages/features/imoveis/imovel-detalhe/imovel-detalhe.component.ts

import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Imovel } from '../../../../core/models/imovel';
import { ImovelService } from '../../../../core/services/imovel';
import { Locatario } from '../../../../core/models/locatario';
import { LocatarioService } from '../../../../core/services/locatario';
@Component({
  selector: 'app-imovel-detalhe',
  standalone: true,
  imports: [
    NgIf,
    CurrencyPipe,
    RouterLink,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './imovel-detalhe.html',
  styleUrls: ['./imovel-detalhe.scss']
})
export class ImovelDetalheComponent implements OnInit {
  // Injeta as ferramentas que precisamos
  private route = inject(ActivatedRoute);
  private imovelService = inject(ImovelService);
  private locatarioService = inject(LocatarioService);
  // Cria um sinal para armazenar os dados do imóvel que encontrarmos
  imovel = signal<Imovel | undefined>(undefined);
  locatario = signal<Locatario | undefined>(undefined);
  ngOnInit(): void {
    const imovelId = this.route.snapshot.paramMap.get('id');
    if (imovelId) {
      const imovelEncontrado = this.imovelService.getImovelById(imovelId);
      this.imovel.set(imovelEncontrado);
      // ✅ 4. Se o imóvel tem um locatário, busca os dados dele
      if (imovelEncontrado && imovelEncontrado.locatarioId) {
        const locatarioEncontrado = this.locatarioService.getLocatarioById(imovelEncontrado.locatarioId);
        this.locatario.set(locatarioEncontrado);
      }
    }
  }

  // ✅ 5. Adicione a função para rescindir o contrato
  rescindirContrato(): void {
    const imovelAtual = this.imovel();
    if (imovelAtual && confirm('Tem certeza que deseja rescindir este contrato de aluguel?')) {
      this.imovelService.rescindirContrato(imovelAtual.id);

      // Atualiza os sinais locais para a UI refletir a mudança imediatamente
      this.imovel.set(this.imovelService.getImovelById(imovelAtual.id));
      this.locatario.set(undefined);
    }
  }

}
