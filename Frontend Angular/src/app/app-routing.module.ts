import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WeatherComponent } from './weather/weather.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SunriseSunsetComponent } from './components/sunrise-sunset/sunrise-sunset.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UsersListComponent } from './users-list/users-list.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { WeatherListComponent } from './weather-list/weather-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'weather', component: WeatherComponent },
  { path: ' ', redirectTo: '/weather' },
  {path : 'register' , component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent },
  {path: 'sunrise-sunset' , component:SunriseSunsetComponent},
  {path: 'favorites' , component:FavoritesComponent},
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'admin' , component:AdminComponent},
  {path : 'feedback', component: FeedbackComponent},
  {path: 'UsersList', component:UsersListComponent},
  {path: 'FeedbackList', component:FeedbackListComponent},
  {path: 'WeatherList', component:WeatherListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
