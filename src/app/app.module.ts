import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturesModule } from './features/features.module';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { ContentWrapperComponent } from './core/components/content-wrapper/content-wrapper.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AuthModule } from './auth/auth.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './share/components/confirmation/confirmation.component';
import { AdministratorModule } from './administrator/administrator.module';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ContentWrapperComponent,
    PageNotFoundComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AdministratorModule,
    AuthModule,
    FeaturesModule,
    SharedModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    CommonModule,
    TranslateModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
