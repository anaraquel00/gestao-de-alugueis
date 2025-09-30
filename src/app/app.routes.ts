import { Routes } from '@angular/router';

// Importamos o nosso componente da lista de imóveis.
import { ImovelListComponent } from './pages/features/imoveis/imovel-list/imovel-list';
import { Cadastro } from './pages/cadastro/cadastro';
import { About } from './pages/about/about';
import { Home } from './home/home';
import { Clientes } from './pages/cadastro/clientes/clientes';
import { ImovelDetalheComponent } from './pages/features/imoveis/imovel-detalhe/imovel-detalhe';
import { ImovelEditComponent } from './pages/features/imoveis/imovel-edit/imovel-edit';
import { ImovelCadastroComponent } from './pages/features/imoveis/imovel-cadastro/imovel-cadastro';
// O array 'routes' define o mapa de navegação da nossa aplicação.
export const routes: Routes =  [
  { path: '', redirectTo: 'home', pathMatch: 'full',

   },
  {path: 'home', component: Home},


     { path: 'imovel-list', component: ImovelListComponent },
{ path: 'imovel/cadastro', component: ImovelCadastroComponent },
      {path: 'imovel/detalhe/:id', component: ImovelDetalheComponent },
      { path: 'imovel/edit/:id', component: ImovelEditComponent },

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
