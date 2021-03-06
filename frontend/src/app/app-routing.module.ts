import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {LeaderboardComponent} from "./components/leaderboard/leaderboard.component";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {StockListComponent} from "./components/stock-list/stock-list.component";
import {StockDetailComponent} from "./components/stock-detail/stock-detail.component";
import {AuthGuard} from "./services/auth/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/stock-list', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'user/:id', component: ProfileComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'stock-list', component: StockListComponent},
  {path: 'stock-detail/:id', component: StockDetailComponent},
  {path: 'leaderboard', component: LeaderboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
