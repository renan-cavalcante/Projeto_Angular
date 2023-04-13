import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClienteComponent } from './pages/cliente/listar/cliente.component';
import { CadastrarAtualizarComponent } from './pages/cliente/cadastra/cadastrar-atualizar.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'clientes', component: ClienteComponent},
  { path: 'clientes/cadastrar', component: CadastrarAtualizarComponent},
  { path: 'clientes/editar/:cpf', component: CadastrarAtualizarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
