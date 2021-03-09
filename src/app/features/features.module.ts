import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { MyRtiComponent } from './my-rti/my-rti.component';
import { PricingComponent } from './pricing/pricing.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { TeamComponent } from './team/team.component';




@NgModule({
  declarations: [
    HomeComponent,
    MyRtiComponent,
    PricingComponent,
    TeamComponent
  ],
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
  ],
  exports: [
    HomeComponent,
    MyRtiComponent,
    PricingComponent
  ]
})
export class FeaturesModule { }
