import { ICryptoApi } from './interfaces/icrypto-api';
import { DataService } from './services/data.service';
import { Component } from '@angular/core';
import { IAppState } from './interfaces/iapp-state';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { select, NgRedux } from '@angular-redux/store';
import { Icurrency } from './interfaces/icurrency';
import { SET_VALUE } from './data/app.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @select() wallet$: Observable<Icurrency[]>;
  @select() exchangeRate$: Observable<number>;
  
  constructor(private dataService:DataService, private _dataStore:NgRedux<IAppState>){ }

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

  updateData(){
    this.updateAllCurrencies()
    /* let wallet;
    this._dataStore.select('wallet').subscribe(wlt => wallet = wlt);
    for(let cur of wallet){
      console.log(cur);
      this.dataService.getWalletValue(cur.code);
    } */

    /* this.wallet$.forEach(item => {
      item.forEach(cur => {
        this.loadings[cur.code] = true;
        this.dataService.getWalletValue(cur.code);
      })
      this.dataService.getWalletValue(cur.code);
      console.log(this.loadings)
    }) */
  }


}