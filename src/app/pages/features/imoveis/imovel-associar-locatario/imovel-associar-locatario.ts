import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

import { Imovel } from '../../../../core/models/imovel';
import { ImovelService } from '../../../../core/services/imovel';
import { Locatario } from '../../../../core/models/locatario';
import { LocatarioService } from '../../../../core/services/locatario';

@Component({
  selector: 'app-imovel-associar-locatario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatRadioModule,
    RouterLink
  ],
  templateUrl: './imovel-associar-locatario.html',
  styleUrls: ['./imovel-associar-locatario.scss'],
})
export class ImovelAssociarLocatarioComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private imovelService = inject(ImovelService);
  private locatarioService = inject(LocatarioService);

  imovel = signal<Imovel | undefined>(undefined);
  locatarios = this.locatarioService.locatarios;

  selectedLocatarioId: string | undefined;

  ngOnInit(): void {
    const imovelId = this.route.snapshot.paramMap.get('id');
    if (imovelId) {
      this.imovel.set(this.imovelService.getImovelById(imovelId));
    }
  }

  associarLocatario(): void {
    const currentImovel = this.imovel();
    if (currentImovel && this.selectedLocatarioId) {
      // Cria um objeto de imóvel atualizado
      const imovelAtualizado: Imovel = {
        ...currentImovel,
        status: 'alugado',
        locatarioId: this.selectedLocatarioId,
      };

      // Chama o serviço para salvar a atualização
      this.imovelService.updateImovel(currentImovel.id, imovelAtualizado);

      // Navega de volta para a página de detalhes do imóvel
      this.router.navigate(['/imovel/detalhe', currentImovel.id]);
    }
  }
}
