import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage  } from '@angular/common';

// 1. Importe os módulos que vamos usar
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

import { ImovelService } from '../../../../core/services/imovel';
import { RouterLink } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";



@Component({
  selector: 'app-imovel-list',
  standalone: true,
  templateUrl: './imovel-list.html',
  styleUrl: './imovel-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // 2. Adicione os módulos importados aqui
  imports: [CurrencyPipe, MatCardModule, MatChipsModule, MatButtonModule, RouterLink, MatIconModule],
})
export class ImovelListComponent {
  private imovelService = inject(ImovelService);
  public imoveis = this.imovelService.imoveis;
}
