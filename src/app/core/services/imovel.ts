// src/app/core/services/imovel.service.ts

import { Injectable, signal, computed, effect } from '@angular/core';
import { Imovel } from '../models/imovel';

// Chave que usaremos para salvar e recuperar os dados do localStorage.
const IMOVEIS_STORAGE_KEY = 'imoveis-app-data';

@Injectable({
  providedIn: 'root', // Torna o serviço um singleton disponível em toda a aplicação.
})
export class ImovelService {
  // Usamos um sinal privado (#) para armazenar a lista de imóveis.
  // O 'signal' é reativo: quando seu valor muda, qualquer parte da UI que o utiliza
  // será atualizada automaticamente.
  // Ele é inicializado com os dados do localStorage ou um array vazio.
  // Esta é uma PROPRIEDADE (armazena a lista de imóveis)
  #imoveis = signal<Imovel[]>(this.#loadFromStorage());

  // Expomos um sinal público e somente de leitura (readonly) para o resto da aplicação.
  // Isso segue a boa prática de não permitir que componentes externos modifiquem o estado diretamente.
  public imoveis = this.#imoveis.asReadonly();

  constructor() {
    // 'effect' é uma função que roda sempre que um sinal lido dentro dela muda.
    // Aqui, usamos para salvar automaticamente a lista de imóveis no localStorage
    // sempre que ela for alterada (adicionada, editada, etc.).

    if (this.#imoveis().length === 0) {
      // AQUI estamos CHAMANDO o método (a ação)
      this.#seedInitialData();
    }

    effect(() => {
      this.#saveToStorage(this.#imoveis());
    });
  }
   /**
   * E AQUI estamos DEFININDO O MÉTODO (a ação)
   * Note a sintaxe: nome, parênteses (), e as chaves {} com a lógica dentro.
   */
  #seedInitialData(): void {
    const dadosIniciais: Imovel[] = [
        {
        id: crypto.randomUUID(),
        titulo: 'Apartamento Aconchegante no Centro',
        endereco: 'Rua das Flores, 123, Centro',
        numeroQuartos: 2,
        valorAluguel: 2500,
        status: 'disponivel',
      },
      {
        id: crypto.randomUUID(),
        titulo: 'Casa Espaçosa com Quintal',
        endereco: 'Avenida das Árvores, 456, Bairro Verde',
        numeroQuartos: 3,
        valorAluguel: 3800,
        status: 'alugado',
      },
      {
        id: crypto.randomUUID(),
        titulo: 'Studio Moderno Perto do Metrô',
        endereco: 'Praça da Liberdade, 789, Metrópole',
        numeroQuartos: 1,
        valorAluguel: 1800,
        status: 'disponivel',
      },
    ];
    this.#imoveis.set(dadosIniciais);
  }

  /**
   * Carrega os dados do localStorage.
   * @returns A lista de imóveis ou um array vazio se não houver nada.
   */
  #loadFromStorage(): Imovel[] {
    const data = localStorage.getItem(IMOVEIS_STORAGE_KEY);
    // Se houver dados, converte de string JSON para objeto. Caso contrário, retorna um array vazio.
    return data ? JSON.parse(data) : [];
  }

  /**
   * Salva a lista de imóveis no localStorage.
   * @param imoveis A lista de imóveis a ser salva.
   */
  #saveToStorage(imoveis: Imovel[]): void {
    localStorage.setItem(IMOVEIS_STORAGE_KEY, JSON.stringify(imoveis));
  }

  /**
   * Adiciona um novo imóvel à lista.
   * @param imovel O novo imóvel a ser adicionado (sem o ID).
   */
  addImovel(imovel: Omit<Imovel, 'id'>): void {
    // A função 'update' de um sinal nos dá o valor atual
    // e espera que retornemos o novo valor. É a forma segura e imutável de atualizar o estado.
    this.#imoveis.update((imoveisAtuais) => [
      // Cria um novo imóvel com um ID único (usando timestamp) e o adiciona
      // ao início da lista junto com os imóveis existentes.
      { ...imovel, id: crypto.randomUUID() },
      ...imoveisAtuais,
    ]);
  }

  // Futuramente, adicionaremos aqui os métodos para editar, excluir, etc.
}
