// src/app/app.routes.ts

import { Routes } from '@angular/router';

// Importamos o nosso componente da lista de imóveis.
import { ImovelListComponent } from './pages/features/imoveis/imovel-list/imovel-list';
import { Cadastro } from './pages/cadastro/cadastro';
import { About } from './pages/about/about';
import { Home } from './home/home';
import { Clientes } from './pages/cadastro/clientes/clientes';

// O array 'routes' define o mapa de navegação da nossa aplicação.
export const routes: Routes =  [
  { path: '', redirectTo: 'home', pathMatch: 'full' },



  { path: 'imovel-list', component: ImovelListComponent},
  { path :'about', component: About},

   {
    path: 'cadastro',
    component: Cadastro,
    children: [
      { path: '', redirectTo: 'clientes', pathMatch: 'full' }, // ✅ redireciona
      { path: 'clientes', component: Clientes }, // rota para /cadastro/clientes

    ]
  },

  // Rota curinga para capturar qualquer rota não definida e redirecionar para Home
    //{ path: '**', component: Home }
  ];
