import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { GuardRotaGuard } from './shared/guards/guard-rota.guard';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { NoGuardRotaGuard } from './shared/guards/noguard-rota.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate: [NoGuardRotaGuard] },
  { path: 'cadastro', component: CadastroComponent,canActivate: [NoGuardRotaGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'blog', component: HomeComponent,canActivate: [GuardRotaGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
