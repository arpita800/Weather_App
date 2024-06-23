import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component'; 
import { OpenWeatherService } from './services/open-weather.service'; 
import { OpenCageService } from './services/open-cage.service';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SunriseSunsetComponent } from './components/sunrise-sunset/sunrise-sunset.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MatIconModule } from '@angular/material/icon'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';

import { GoogleChartsModule } from 'angular-google-charts';
import { FeedbackComponent } from './feedback/feedback.component';
import { UsersListComponent } from './users-list/users-list.component';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';



@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    MapComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SunriseSunsetComponent,
    FavoritesComponent,
    HomeComponent,
    AdminComponent,
    FeedbackComponent,
    UsersListComponent,
    WeatherListComponent,
    FeedbackListComponent,
    ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    LeafletModule,
    MatIconModule,
    BrowserAnimationsModule,
    GoogleChartsModule
    
  ],
  providers: [
    OpenWeatherService, 
    OpenCageService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
