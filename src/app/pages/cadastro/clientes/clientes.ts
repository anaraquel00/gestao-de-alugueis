import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { LocatarioService } from '../../../core/services/locatario';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss'
})
export class Clientes {
  form: FormGroup;

  // ✅ Injete os serviços que precisamos usando inject()
  private locatarioService = inject(LocatarioService);
  private snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
    });
  }

  // ✅ Atualize a função salvar
  salvar() {
    if (this.form.valid) {
      // Pega os dados do formulário
      const novoLocatario = this.form.value;

      // Envia para o serviço (sem o campo 'senha', que não está no modelo Locatario)
      this.locatarioService.addLocatario({
        nome: novoLocatario.nome,
        email: novoLocatario.email,
        telefone: novoLocatario.telefone
      });

      // Mostra uma notificação de sucesso
      this.snackBar.open('Novo locatário cadastrado com sucesso!', 'Fechar', {
        duration: 3000
      });

      // Redireciona o usuário para a lista de imóveis
      this.router.navigate(['/imovel-list']);
    }
  }

  cancelar() {
    this.router.navigate(['/home']);
  }
}


