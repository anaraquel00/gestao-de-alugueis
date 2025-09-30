// src/app/pages/features/imoveis/imovel-cadastro/imovel-cadastro.component.ts

import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ImovelStatus } from '../../../../core/models/imovel';
import { ImovelService } from '../../../../core/services/imovel';
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-imovel-cadastro',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatCardModule, MatSelectModule,
    MatIconModule,MatSnackBarModule
],
  templateUrl: './imovel-cadastro.html',
  styleUrls: ['./imovel-cadastro.scss']
})
export class ImovelCadastroComponent {

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private imovelService = inject(ImovelService);
  private snackbar = inject (MatSnackBar)

  form: FormGroup;
  statusOptions: ImovelStatus[] = ['disponivel', 'alugado'];



  constructor() {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      endereco: ['', Validators.required],
      numeroQuartos: [null, [Validators.required, Validators.min(1)]],
      valorAluguel: [null, [Validators.required, Validators.min(1)]],
      status: ['disponivel', Validators.required],
      image: ['images/default-placeholder.png', Validators.required] // Uma imagem padrão
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    // Garante que o usuário selecionou um arquivo
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      // Callback que será chamado quando o arquivo for lido
      reader.onload = () => {
        // O resultado é o texto Base64 da imagem.
        // Usamos patchValue para atualizar apenas o campo 'image' do nosso formulário.
        this.form.patchValue({
          image: reader.result as string
        });
      };

      // Inicia a leitura do arquivo e a conversão para Base64
      reader.readAsDataURL(file);
    }
  }


  salvar(): void {
    if (this.form.valid) {
      this.imovelService.addImovel(this.form.value);
      this.router.navigate(['/imovel-list']);
      this.snackbar.open('✅ Imovel adicionado com sucesso!', 'Fechar',{ duration: 3000 })
    }
    this.router.navigate(['/imovel-list']);
  }

  cancelar(): void {
    this.router.navigate(['/imovel-list']);
  }
}
