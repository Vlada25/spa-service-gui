import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { AdminsPageComponent } from './pages/admins-page/admins-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ServicesDataPageComponent } from './pages/services-data-page/services-data-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { UserService } from './services/user.service';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'services', component: ServicesPageComponent },
  { path: 'servicesData/:id/:name', component: ServicesDataPageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'forAdmins', component: AdminsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
