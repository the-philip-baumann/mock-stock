import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {AvatarModule} from "primeng/avatar";
import {RegisterComponent} from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { SellComponent } from './components/sell/sell.component';
import { StockListComponent } from './components/stock-list/stock-list.component';
import {TableModule} from 'primeng/table';
import {PasswordModule} from 'primeng/password';
import {FormsModule} from "@angular/forms";
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {HttpClientModule} from "@angular/common/http";
import {DialogModule} from 'primeng/dialog';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import {MenubarModule} from 'primeng/menubar';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LeaderboardComponent,
    StockDetailComponent,
    ProfileComponent,
    PurchaseComponent,
    SellComponent,
    StockListComponent,
    LogoutButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    AvatarModule,
    TableModule,
    PasswordModule,
    FormsModule,
    InputTextModule,
    CardModule,
    HttpClientModule,
    DialogModule,
    MenubarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
