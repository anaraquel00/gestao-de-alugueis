// src/app/pages/features/imoveis/imovel-edit/imovel-edit.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { Imovel, ImovelStatus } from '../../../../core/models/imovel';
import { ImovelService } from '../../../../core/services/imovel';
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-imovel-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule
],
    templateUrl: './imovel-edit.html',
    styleUrls: ['./imovel-edit.scss']
})
export class ImovelEditComponent implements OnInit {
[x: string]: any;
id: number|undefined;
images: any;

onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.form.patchValue({
          image: reader.result as string
        });
      };

      reader.readAsDataURL(file);
    }
  }

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private imovelService = inject(ImovelService);
  private snackBar = inject(MatSnackBar);

  form!: FormGroup;
  imovelId?: string | null;
  imovel?: Imovel;
  statusOptions: ImovelStatus[] = ['disponivel', 'alugado'];

  ngOnInit(): void {
    // 1. Cria a estrutura do formulário (ainda vazio)
    this.form = this.fb.group({
      id: [''], // Mantém o ID, mas desabilitado no formulário
      titulo: ['', Validators.required],
      endereco: ['', Validators.required],
      numeroQuartos: [0, [Validators.required, Validators.min(1)]],
      valorAluguel: [0, [Validators.required, Validators.min(1)]],
      status: ['', Validators.required],
      image: ['']
    });

    // 2. Pega o ID da URL
    this.imovelId = this.route.snapshot.paramMap.get('id');

    // 3. Se existe um ID, busca os dados e preenche o formulário
    if (this.imovelId) {
      this.imovel = this.imovelService.getImovelById(this.imovelId);
      if (this.imovel) {
        // O patchValue preenche o formulário com os dados do objeto
        this.form.patchValue(this.imovel);
      }
    }
  }

  salvar(): void {
    if (this.form.valid && this.imovelId) {
      // Pega os valores atualizados do formulário
      const imovelAtualizado = this.form.value;
      // Chama o serviço para salvar as alterações
      this.imovelService.updateImovel(this.imovelId, imovelAtualizado);
      this.snackBar.open('✅ Imovel atualizado com sucesso!', 'Fechar',{ duration: 3000 })
      // Navega de volta para a lista após salvar
      this.router.navigate(['/imovel-list']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/imovel-list']);
  }

  deleteImovel(): void {
    // 1. Confirmação: Garante que não vamos excluir acidentalmente.
    if (this.imovelId && confirm('Você tem certeza que deseja excluir este imóvel?')) {
      // 2. Chama o serviço para excluir o imóvel
      this.imovelService.deleteImovel(this.imovelId);

      // 3. Mostra uma notificação de sucesso
      this.snackBar.open('Imóvel excluído com sucesso!', 'Fechar', {
        duration: 3000,
      });

      // 4. Navega de volta para a lista de imóveis
      this.router.navigate(['/imovel-list']);
    }
  }
}
