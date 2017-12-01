import { MaterialModule } from './material-module/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// data store
import { IAppState } from './interfaces/iapp-state';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { rootReducer, INITIAL_STATE } from './data/app.store';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(ngRedux: NgRedux<IAppState>){
    // Initialize the data store
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
    
  }

}
