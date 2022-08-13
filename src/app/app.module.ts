import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SpaServiceComponent } from './components/spa-service/spa-service.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceTypeComponent } from './components/service-type/service-type.component';
import { SearchServiceTypesPipe } from './pipes/search-service-types.pipe';
import { FormsModule } from '@angular/forms';
import { ServicesDataPageComponent } from './pages/services-data-page/services-data-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomePageComponent,
    SpaServiceComponent,
    ServicesPageComponent,
    ServiceTypeComponent,
    SearchServiceTypesPipe,
    ServicesDataPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
