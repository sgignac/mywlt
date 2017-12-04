import { Iapi } from './../interfaces/Iapi';
import { Icurrency } from './../interfaces/icurrency';
import { Observable } from 'rxjs/Observable';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppState } from '../interfaces/iapp-state';
import { IExchangeRate } from '../interfaces/iexchange-rate';
import { SET_EXCHANGE_RATE, SET_VALUE } from '../data/app.actions';
import { ICryptoApi } from '../interfaces/icrypto-api';

@Injectable()
export class DataService {

  constructor(private _http:HttpClient, private _dataStore:NgRedux<IAppState>) { }

  getExchangeRate() {
    this._http.get('https://openexchangerates.org/api/latest.json?app_id=278b60688af74a95abc6f4e5e83b0a5c')
      .subscribe(data => {
        let result:IExchangeRate = data as IExchangeRate;
        this._dataStore.dispatch({type: SET_EXCHANGE_RATE, payload: result.rates.CAD});
        }
    )
  }; 

  getAllWalletValues(){
    let wallet;
    this._dataStore.select('wallet').subscribe(wlt => wallet = wlt);
    let codes:string = wallet.map(o => o.code).join(',');
    return this._http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + codes + '&tsyms=USD')
  }

  getWalletValue(code:string){
    return this._http.get<ICryptoApi>('https://min-api.cryptocompare.com/data/price?fsym=' + code + '&tsyms=USD')
  }

  getOnlineWallet(){
    return this._http.get<Iapi>('http://apiwlt.sebdevlab.com/?key=121212')
  }

}
