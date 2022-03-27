import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GymsComponent } from './component/gyms/gyms.component';
import { GymComponent } from './component/gym/gym.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './component/inicio/inicio.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule , HttpClientJsonpModule} from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InputSearchComponent } from './component/input-search/input-search.component';

@NgModule({
  declarations: [
    AppComponent,
    GymsComponent,
    GymComponent,
    HeaderComponent,
    InicioComponent,
    InputSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatProgressBarModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
