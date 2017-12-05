import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { ICryptoApi } from './interfaces/icrypto-api';
import { DataService } from './services/data.service';
import { Component } from '@angular/core';
import { IAppState } from './interfaces/iapp-state';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { select, NgRedux } from '@angular-redux/store';
import { Icurrency } from './interfaces/icurrency';
import { SET_VALUE, SET_WALLET } from './data/app.actions';
import { MatDialog } from '@angular/material';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @select() wallet$: Observable<Icurrency[]>;
  @select() exchangeRate$: Observable<number>;
  

  constructor(
    private _dataService:DataService, 
    private _dataStore:NgRedux<IAppState>,
    private _dialog:MatDialog,
    private _translate: TranslateService
  ){ }

  ngOnInit() {
    this._dataService.getExchangeRate();
    this.updateAllCurrencies();  
  } 

  loading: boolean = false;

  updateAllCurrencies(){
    this.loading = true;
    this._dataService.getAllWalletValues()
      .subscribe(data =>{
          this.loading = false;
        }
      )
  }

  addNewCurrency(){
    let dialogRef = this._dialog.open(AddDialogComponent, {width: '95%', data: ""});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.success){
          this._dataService.addNewCurrency(result.data);
        }
      }
    });
  }

  editCurrency(data){
    let dialogRef = this._dialog.open(AddDialogComponent, {width: '95%', data: data});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.success){
          this._dataService.editCurrency(result.data);
        }
      }
    });
  }

  deleteCurrency(data) {
    let dialogRef = this._dialog.open(ConfirmDialogComponent, {width: '95%', data: data.code});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._dataService.deleteCurrency(data);
      }
    });
  }

  switchLanguage(){
    let lang:string = this._translate.currentLang === 'en' ? 'fr' : 'en';
    this.loading = true;
    this._translate.use(lang).subscribe(data =>{
      this.loading = false;
    });
  }

}