import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage  } from '@angular/common';

// 1. Importe os módulos que vamos usar
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { ImovelStatus } from '../../../../core/models/imovel';
import { ImovelService } from '../../../../core/services/imovel';
import { RouterLink } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from '@angular/material/form-field';



@Component({
  selector: 'app-imovel-list',
  standalone: true,
  templateUrl: './imovel-list.html',
  styleUrl: './imovel-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // 2. Adicione os módulos importados aqui
  imports: [CurrencyPipe,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    NgOptimizedImage],
})
export class ImovelListComponent {
  // Sinais para guardar os valores dos filtros
  searchTerm = signal<string>('');
  statusFilter = signal<ImovelStatus | 'todos'>('todos');

  // Sinal computado que reage a mudanças na lista ou nos filtros
  filteredImoveis = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const status = this.statusFilter();
    const imoveis = this.imovelService.imoveis();

    return imoveis.filter((imovel: { titulo: string; endereco: string; status: string; }) => {
      const termoMatch =
        imovel.titulo.toLowerCase().includes(term) ||
        imovel.endereco.toLowerCase().includes(term);

      const statusMatch =
        status === 'todos' || imovel.status === status;

      return termoMatch && statusMatch;
    });
  });

  // Funções para atualizar os sinais de filtro a partir do HTML
  onSearchTermChange(term: string): void {
    this.searchTerm.set(term);
  }

  onStatusChange(status: ImovelStatus | 'todos'): void {
    this.statusFilter.set(status);
  }

  private imovelService = inject(ImovelService);
  public imoveis = this.imovelService.imoveis;

}
