# Gestão de Aluguéis - Fuctura Imobiliária

 Este projeto é uma Single-Page Application (SPA) desenvolvida em Angular, criada como solução para o desafio de frontend da Fuctura. O objetivo é fornecer uma interface moderna, responsiva e intuitiva para o gerenciamento de aluguéis de imóveis.

**[Acesse a demonstração ao vivo aqui\!](https://anaraquel00.github.io/gestao-de-alugueis/)** \#\# 🚀 Objetivo

Desenvolver uma SPA que permita gerenciar o ciclo de vida completo do aluguel de imóveis, desde o cadastro até a associação com locatários, com foco em uma experiência de usuário limpa e acessível, mesmo para usuários com pouca experiência técnica.

## ✨ Funcionalidades Implementadas

A aplicação implementa um CRUD (Create, Read, Update, Delete) completo para a gestão de imóveis e locatários.

  * **Listagem de Imóveis:** Visualização de todos os imóveis em formato de cards responsivos.
  * **Cadastro de Imóveis:** Formulário para adicionar um novo imóvel, incluindo upload de imagem.
  * **Edição de Imóveis:** Formulário pré-preenchido para alterar qualquer informação de um imóvel existente.
  * **Exclusão de Imóveis:** Opção para remover um imóvel do sistema, com diálogo de confirmação.
  * **Detalhes do Imóvel:** Página dedicada para visualizar todas as informações de um imóvel, incluindo dados do locatário associado.
  * **Gestão de Locatários:**
      * Cadastro de novos locatários.
      * Associação de um locatário a um imóvel disponível, alterando o status para "alugado".
      * Rescisão de contrato, desassociando o locatário e tornando o imóvel "disponível" novamente.
  * **Design Responsivo:** A interface se adapta elegantemente a dispositivos móveis, tablets e desktops.

*(Em desenvolvimento: Filtragem e busca de imóveis.)*

## 🛠️ Tecnologias e Decisões Técnicas

Este projeto foi construído utilizando as versões mais recentes do Angular e segue as melhores práticas de desenvolvimento frontend.

  * **Framework:** Angular 20+
  * **Linguagem:** TypeScript
  * **Arquitetura:**
      * **Componentes Standalone:** Utilização da arquitetura moderna do Angular, sem a necessidade de `NgModules`, para componentes mais simples e reutilizáveis.
      * **Estrutura de Pastas:** Organização modular por `core` (serviços e modelos), `pages` (componentes de rota) e `components` (componentes reutilizáveis).
  * **Gerenciamento de Estado:**
      * **Angular Signals:** Para um gerenciamento de estado reativo, performático e sem boilerplate.
      * **Persistência de Dados:** O estado da aplicação (imóveis e locatários) é persistido localmente no `localStorage` do navegador, simulando um backend.
  * **UI e Estilização:**
      * **Angular Material:** Utilizado para a base de componentes de UI, como cards, botões, formulários e a toolbar.
      * **SCSS:** Para estilização com CSS aninhado, variáveis e media queries para responsividade.
  * **Formulários:**
      * **Reactive Forms:** Para a construção de formulários robustos, com validação e controle total sobre o estado dos dados.
  * **Navegação:**
      * **Angular Router:** Para gerenciar a navegação entre as diferentes páginas da aplicação.
  * **Otimização:**
      * **`NgOptimizedImage`:** Utilizada para o carregamento otimizado de imagens, aplicando lazy loading automaticamente.

## ⚙️ Como Executar Localmente

Para rodar este projeto na sua máquina, siga os passos abaixo.

### Pré-requisitos

  * [Node.js](https://nodejs.org/) (versão LTS recomendada)
  * [Angular CLI](https://angular.dev/cli) instalado globalmente (`npm install -g @angular/cli`)

### Instalação e Execução

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/SEU-USUARIO/gestao-de-alugueis.git
    ```

2.  **Navegue até a pasta do projeto:**

    ```bash
    cd gestao-de-alugueis
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**

    ```bash
    ng serve
    ```

5.  Abra seu navegador e acesse `http://localhost:4200/`. A aplicação recarregará automaticamente se você modificar qualquer arquivo-fonte.

-----
