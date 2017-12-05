import { SET_WALLET } from './../data/app.actions';
import { Iapi } from './../interfaces/Iapi';
import { Icurrency } from './../interfaces/icurrency';
import { Observable } from 'rxjs/Observable';
import { select, NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IAppState } from '../interfaces/iapp-state';
import { IExchangeRate } from '../interfaces/iexchange-rate';
import { SET_EXCHANGE_RATE, SET_VALUE } from '../data/app.actions';
import { ICryptoApi } from '../interfaces/icrypto-api';

@Injectable()
export class DataService {

  @select(['configuration', 'apikey']) apikey$:Observable<string>;
  
  //apikey:string = "";

  constructor(private _http:HttpClient, private _dataStore:NgRedux<IAppState>) {
    
  }

  getExchangeRate() {
    this._http.get('https://openexchangerates.org/api/latest.json?app_id=278b60688af74a95abc6f4e5e83b0a5c')
      .subscribe(data => {
        let result:IExchangeRate = data as IExchangeRate;
        this._dataStore.dispatch({type: SET_EXCHANGE_RATE, payload: result.rates.CAD});
        }
    )
  }; 

  getAllWalletValues(){
    let req;
    let wallet;
    this._dataStore.select('wallet').subscribe(wlt => wallet = wlt);
    let codes:string = wallet.map(o => o.code).join(',');
    req = this._http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + codes + '&tsyms=USD');
    req.subscribe(data =>{
      Object.keys(data).forEach(key => {
        let cur:ICryptoApi = data[key] as ICryptoApi;
        this._dataStore.dispatch({type: SET_VALUE, payload: {code: key, value: cur.USD}});
      });
    });
    return req;
  }

  getWalletValue(code:string){
    return this._http.get<ICryptoApi>('https://min-api.cryptocompare.com/data/price?fsym=' + code + '&tsyms=USD')
  }

  getOnlineWallet(){
    const params = new HttpParams()
      .set('key', '121212');
    let req = this._http.get<Iapi>('http://apiwlt.sebdevlab.com/', {params: params});
    req.subscribe(data =>{
      this._dataStore.dispatch({ type: SET_WALLET, payload: { value: data.results.data } });
      this.getAllWalletValues();     
      }
    )
    return req;    
  }

  addNewCurrency(data){
    const params = new HttpParams()
    .set('key', '121212')
    .set('code', data.code)
    .set('amount', data.amount)
    .set('invested', data.invested);
    this._http.put('http://apiwlt.sebdevlab.com/', {}, {params: params}).subscribe(data => {
      this.getOnlineWallet();
    })
  }

  editCurrency(data){
    const params = new HttpParams()
    .set('key', '121212')
    .set('id', data.id)
    .set('code', data.code)
    .set('amount', data.amount)
    .set('invested', data.invested);
    this._http.post('http://apiwlt.sebdevlab.com/', {}, {params: params}).subscribe(data => {
      this.getOnlineWallet();
    })
  }

  deleteCurrency(data){
    const params = new HttpParams()
    .set('key', '121212')
    .set('id', data.id);
    this._http.delete('http://apiwlt.sebdevlab.com/', {params: params}).subscribe(data => {
      this.getOnlineWallet();
    })
  }


}