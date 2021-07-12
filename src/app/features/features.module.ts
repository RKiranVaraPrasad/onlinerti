import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TeamComponent } from './team/team.component';
import { TrackComponent } from './track/track.component';
import { SharedModule } from '../shared/shared.module';
import {  TranslateModule } from '@ngx-translate/core';
import { AboutRtiComponent } from './about-rti/about-rti.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactComponent } from './contact/contact.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    HomeComponent,
    PricingComponent,
    TeamComponent,
    TrackComponent,
    AboutRtiComponent,
    FaqsComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
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
    TranslateModule,
    ModalModule.forRoot()
  ],
  exports: [
    HomeComponent,
    PricingComponent,
    TranslateModule
  ]
})
export class FeaturesModule { }
