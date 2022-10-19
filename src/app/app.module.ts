import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SpaServiceComponent } from './components/spa-service/spa-service.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceTypeComponent } from './components/service-type/service-type.component';
import { SearchServiceTypesPipe } from './pipes/search-service-types.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesDataPageComponent } from './pages/services-data-page/services-data-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { UserComponent } from './components/user/user.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginComponent } from './components/modal-windows/login/login.component';
import { RegisterComponent } from './components/modal-windows/register/register.component';
import { AdminsPageComponent } from './pages/admins-page/admins-page.component';
import { CreateServiceTypeComponent } from './components/creation/create-service-type/create-service-type.component';
import { TokenInterceptor } from './classes/token-interceptor';
import { DoOrderComponent } from './components/modal-windows/do-order/do-order.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { OrderComponent } from './components/order/order.component';
import { PreLoadPhotoComponent } from './components/modal-windows/pre-load-photo/pre-load-photo.component';
import { MastersPageComponent } from './pages/masters-page/masters-page.component';
import { MasterOrderComponent } from './components/master-order/master-order.component';
import { FilterOrderPipe } from './pipes/filter-order.pipe';
import { SearchMasterOrderDatePipe } from './pipes/search-master-order-date.pipe';

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
    DoOrderComponent,
    OrdersPageComponent,
    OrderComponent,
    PreLoadPhotoComponent,
    MastersPageComponent,
    MasterOrderComponent,
    FilterOrderPipe,
    SearchMasterOrderDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
