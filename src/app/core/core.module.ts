import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContentWrapperComponent } from './components/content-wrapper/content-wrapper.component';



@NgModule({
  declarations: [NavbarComponent, FooterComponent, PageNotFoundComponent, ContentWrapperComponent],
  imports: [
    CommonModule, 
    
  ],
  exports: [
    NavbarComponent, FooterComponent, ContentWrapperComponent
  ]
})
export class CoreModule { }
