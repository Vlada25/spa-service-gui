import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './classes/auth-guard';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { AdminOrdersPageComponent } from './pages/admin-orders-page/admin-orders-page.component';
import { AdminsPageComponent } from './pages/admins-page/admins-page.component';
import { FeedbacksPageComponent } from './pages/feedbacks-page/feedbacks-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MastersPageComponent } from './pages/masters-page/masters-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { ServicesDataPageComponent } from './pages/services-data-page/services-data-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'services', component: ServicesPageComponent },
  { path: 'servicesData/:id/:name', component: ServicesDataPageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'forAdmins', component: AdminsPageComponent, canActivateChild: [AuthGuard] },
  { path: 'orders', component: OrdersPageComponent, canActivateChild: [AuthGuard] },
  { path: 'masters', component: MastersPageComponent, canActivateChild: [AuthGuard] },
  { path: 'adminOrders', component: AdminOrdersPageComponent, canActivateChild: [AuthGuard] },
  { path: 'feedbacks/:id', component: FeedbacksPageComponent, canActivateChild: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
