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

  // Cria um sinal para armazenar os dados do imóvel que encontrarmos
  imovel = signal<Imovel | undefined>(undefined);

  ngOnInit(): void {
    // Pega o parâmetro 'id' da URL no momento em que o componente é iniciado
    const imovelId = this.route.snapshot.paramMap.get('id');

    // Se um ID foi encontrado na URL...
    if (imovelId) {
      // ...pede ao serviço para encontrar o imóvel correspondente...
      const imovelEncontrado = this.imovelService.getImovelById(imovelId);
      // ...e atualiza o nosso sinal com os dados.
      this.imovel.set(imovelEncontrado);
    }
  }
}
