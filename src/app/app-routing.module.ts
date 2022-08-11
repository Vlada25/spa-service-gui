import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ServicesDataPageComponent } from './pages/services-data-page/services-data-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'services', component: ServicesPageComponent },
  { path: 'servicesData', component: ServicesDataPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
