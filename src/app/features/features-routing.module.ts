import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyRtiComponent } from './my-rti/my-rti.component';
import { PricingComponent } from './pricing/pricing.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'my-rti', component: MyRtiComponent},
  { path: 'pricing', component: PricingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
