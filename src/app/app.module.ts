import { MaterialModule } from './material-module/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// data store
import { IAppState } from './interfaces/iapp-state';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { rootReducer, INITIAL_STATE } from './data/app.store';

import { AppRoutingModule } from './app-routing.module';

import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CryptoComponent } from './components/crypto/crypto.component';
import { SET_WALLET, SET_CONFIG_PARAM } from './data/app.actions';
import { StartupService } from './services/startup.service';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SummaryComponent } from './components/summary/summary.component';

export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    CryptoComponent,
    AddDialogComponent,
    ConfirmDialogComponent,
    HeaderComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
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
    DataService,
    TranslateService
  ],
  entryComponents: [
    AddDialogComponent,
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(
    private _dataService:DataService, 
    private _dataStore: NgRedux<IAppState>, 
    private _translate:TranslateService,
    private _route: ActivatedRoute
  ){
    this._dataStore.configureStore(rootReducer, INITIAL_STATE);
    _translate.setDefaultLang('en');
    _translate.use('en');

    this._route.queryParams.subscribe(param =>{
      Object.keys(param).forEach(key => {
        this._dataStore.dispatch({type: SET_CONFIG_PARAM, payload: {param: key, value: param[key]}});
      });
      if(param.language){ _translate.use(param.language); }
      this._dataService.getOnlineWallet();
    });

    
  }

  


}
