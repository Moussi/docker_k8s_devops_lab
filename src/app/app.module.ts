import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RentalModule } from './rental/rental.module';
import { AuthModule } from './auth/auth.module';
import { HeaderModule } from './common/header/header.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RentalModule,
    AppRoutingModule,
    HeaderModule,
    AuthModule
  ],
  exports: [HeaderModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
