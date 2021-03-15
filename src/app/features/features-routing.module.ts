import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { TeamComponent } from './team/team.component';
import { TrackComponent } from './track/track.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'track-application', component: TrackComponent},
  { path: 'pricing', component: PricingComponent},
  { path: 'team', component: TeamComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
