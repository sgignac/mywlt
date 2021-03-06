import { SET_VALUE } from './../../data/app.actions';
import { IAppState } from './../../interfaces/iapp-state';
import { select, NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent implements OnInit {

  @select() exchangeRate$
  @Input() inv

  loading:boolean = false;

  constructor(private _dataService:DataService, private _dataStore:NgRedux<IAppState>) { }

  ngOnInit() {
  }

  open: boolean = false;

}
