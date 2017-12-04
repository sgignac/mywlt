import { MaterialModule } from './material-module/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CryptoComponent } from './components/crypto/crypto.component';
import { SET_WALLET } from './data/app.actions';
import { StartupService } from './services/startup.service';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';

export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    CryptoComponent,
    AddDialogComponent,
    EditDialogComponent
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
    StartupService,
    {
      // Provider for APP_INITIALIZER
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    },
    DataService
  ],
  entryComponents: [
    AddDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(private _dataService:DataService, private _dataStore: NgRedux<IAppState>){
    this._dataStore.configureStore(rootReducer, INITIAL_STATE);
    // Initialize the data store
    this._dataService.getOnlineWallet().subscribe(data =>{
      this._dataStore.dispatch({ type: SET_WALLET, payload: { value: data.results.data } });       
    })
  }

  


}
