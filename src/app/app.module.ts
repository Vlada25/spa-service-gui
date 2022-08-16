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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesDataPageComponent } from './pages/services-data-page/services-data-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { UserComponent } from './components/user/user.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminsPageComponent } from './pages/admins-page/admins-page.component';
import { CreateServiceTypeComponent } from './components/creation/create-service-type/create-service-type.component';
import { CreatePhotoComponent } from './components/creation/create-photo/create-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomePageComponent,
    SpaServiceComponent,
    ServicesPageComponent,
    ServiceTypeComponent,
    SearchServiceTypesPipe,
    ServicesDataPageComponent,
    AccountPageComponent,
    UserComponent,
    ModalComponent,
    LoginComponent,
    RegisterComponent,
    AdminsPageComponent,
    CreateServiceTypeComponent,
    CreatePhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
