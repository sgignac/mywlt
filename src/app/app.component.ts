import { DataService } from './services/data.service';
import { Component } from '@angular/core';
import { IAppState } from './interfaces/iapp-state';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { NgRedux, select } from '@angular-redux/store';
import { Icurrency } from './interfaces/icurrency';
import { getCurrentDebugContext } from '@angular/core/src/view/services';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @select() wallet$: Observable<Icurrency[]>;
  @select() exchangeRate$: Observable<number>;
  
  wallet: Icurrency[];
  exchangeRate: number;
  cadChecked: boolean = true;
  activeCurrency: string = 'CAD';
  activeRate: number = 1;
  
  currencyDetails = [];

  constructor(private dataStore:NgRedux<IAppState>, private dataService:DataService){ }

  ngOnInit() {
    this.wallet$.subscribe(wlt => this.wallet = wlt);
    this.exchangeRate$.subscribe(exr => {
      this.exchangeRate = exr;
      this.setRate();
    });
  } 

  setRate(){
    this.activeCurrency = this.cadChecked ? 'CAD' : 'USD';
    this.activeRate = this.cadChecked ? this.exchangeRate : 1;
    this.setCurrencyValues();
  }

  setCurrencyValues(){
    for(let itm of this.wallet){
      this.currencyDetails[itm.code] = this.getCurrencyDetails(itm);
    }
  }

  getCurrencyDetails(_currency:Icurrency){
    let _value = _currency.value * this.activeRate;
    let _total = _value * _currency.amount;
    let _pl = ((_currency.value * this.exchangeRate) * _currency.amount) - _currency.invested;
    let res = {
      value: _value,
      total: _total,
      pl: _pl
    };
    return res;
  }

  updateData(){
    this.dataService.getWalletValues();
  }


}
