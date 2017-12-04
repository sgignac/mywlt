import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { ICryptoApi } from './interfaces/icrypto-api';
import { DataService } from './services/data.service';
import { Component } from '@angular/core';
import { IAppState } from './interfaces/iapp-state';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { select, NgRedux } from '@angular-redux/store';
import { Icurrency } from './interfaces/icurrency';
import { SET_VALUE } from './data/app.actions';
import { MatDialog } from '@angular/material';
import { resetFakeAsyncZone } from '@angular/core/testing';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @select() wallet$: Observable<Icurrency[]>;
  @select() exchangeRate$: Observable<number>;
  
  constructor(
    private dataService:DataService, 
    private _dataStore:NgRedux<IAppState>,
    private _dialog:MatDialog
  ){ }

  ngOnInit() {
    this.dataService.getExchangeRate();
    this.updateAllCurrencies();
  } 

  loading: boolean = false;

  updateAllCurrencies(){
    this.loading = true;
    this.dataService.getAllWalletValues()
      .subscribe(data =>{
          Object.keys(data).forEach(key => {
            let cur:ICryptoApi = data[key] as ICryptoApi;
            this._dataStore.dispatch({type: SET_VALUE, payload: {code: key, value: cur.USD}});
          });
          this.loading = false;
        }
      )
  }

  addNewCurrency(){
    console.log('Add new currency');
    let dialogRef = this._dialog.open(AddDialogComponent, {data: ""});
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed', result);
    });
  }

  editCurrency(code:string){
    console.log('editing ' + code);
  }

  deleteCurrency(code: string) {
    console.log('deleting ' + code);
  }

}