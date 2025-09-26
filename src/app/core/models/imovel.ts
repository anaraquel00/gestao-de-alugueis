// src/app/core/models/imovel.ts

/**
 * Define o tipo de status que um imóvel pode ter.
 * Usar um tipo específico em vez de 'string' nos ajuda a evitar erros,
 * garantindo que apenas valores válidos sejam usados.
 */
export type ImovelStatus = 'disponivel' | 'alugado';

/**
 * Interface que define a estrutura de dados de um Imóvel.
 * Usamos uma interface para garantir que todos os objetos 'Imovel'
 * em nossa aplicação tenham sempre o mesmo formato.
 */
export interface Imovel {
  id: string; // Identificador único para cada imóvel.
  titulo: string;
  endereco: string;
  numeroQuartos: number;
  valorAluguel: number;
  image: string;
  images?: string[];
  status: ImovelStatus;
}
