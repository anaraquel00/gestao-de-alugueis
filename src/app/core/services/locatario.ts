// src/app/core/services/locatario.service.ts

import { Injectable, signal, effect } from '@angular/core';
import { Locatario } from '../models/locatario';

const LOCATARIOS_STORAGE_KEY = 'locatarios-app-data';

@Injectable({
  providedIn: 'root'
})
export class LocatarioService {
  #locatarios = signal<Locatario[]>(this.#loadFromStorage());
  public locatarios = this.#locatarios.asReadonly();

  constructor() {
    // Se não houver dados, semeia com alguns exemplos
    if (this.#locatarios().length === 0) {
      this.#seedInitialData();
    }

    // Salva no localStorage sempre que o sinal mudar
    effect(() => {
      this.#saveToStorage(this.#locatarios());
    });
  }

  #loadFromStorage(): Locatario[] {
    const data = localStorage.getItem(LOCATARIOS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  #saveToStorage(locatarios: Locatario[]): void {
    localStorage.setItem(LOCATARIOS_STORAGE_KEY, JSON.stringify(locatarios));
  }

  #seedInitialData(): void {
    const dadosIniciais: Locatario[] = [
      { id: crypto.randomUUID(), nome: 'João da Silva', email: 'joao.silva@email.com', telefone: '81999887766' },
      { id: crypto.randomUUID(), nome: 'Maria Oliveira', email: 'maria.oliveira@email.com', telefone: '81988776655' },
    ];
    this.#locatarios.set(dadosIniciais);
  }

  // Futuramente, poderíamos adicionar um método para buscar por ID
  getLocatarioById(id: string) {
    return this.locatarios().find(loc => loc.id === id);
  }

  addLocatario(locatario: Omit<Locatario, 'id'>): void {
    this.#locatarios.update((locatariosAtuais) => [
      // Cria um novo locatário com um ID único e o adiciona
      // ao início da lista junto com os locatários existentes.
      { ...locatario, id: crypto.randomUUID() },
      ...locatariosAtuais,
    ]);
  }
}
