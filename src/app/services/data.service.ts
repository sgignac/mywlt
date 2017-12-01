import { Icurrency } from './../interfaces/icurrency';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { IAppState } from '../interfaces/iapp-state';

@Injectable()
export class DataService {

  constructor(private _http:HttpClient, private _dataStore:NgRedux<IAppState>) { 

  }


  getWalletValues(){

    let wallet;
    this._dataStore.select('wallet').subscribe(wlt => wallet = wlt);
    console.log('wallet', wallet);

    for(let cur of wallet){
      this._http.get('https://min-api.cryptocompare.com/data/price?fsym=' + cur.code + '&tsyms=USD')
        .subscribe(data =>{
            console.log(data);
          }
        )
    }

}
