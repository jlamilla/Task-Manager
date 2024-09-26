import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ProfileGateway } from 'src/app/domain/models/profile/gateway/profile-gateway';
import { ProfileApiService } from 'src/app/infraestructure/driven-adapter/profile/profile-api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    {
      provide: ProfileGateway,
      useClass: ProfileApiService,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
