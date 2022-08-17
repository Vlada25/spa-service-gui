import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './classes/auth-guard';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { AdminsPageComponent } from './pages/admins-page/admins-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { ServicesDataPageComponent } from './pages/services-data-page/services-data-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'services', component: ServicesPageComponent },
  { path: 'servicesData/:id/:name', component: ServicesDataPageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'forAdmins', component: AdminsPageComponent, canActivateChild: [AuthGuard] },
  { path: 'orders', component: OrdersPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
