import { Icurrency } from './../../interfaces/icurrency';
import { Observable } from 'rxjs/Observable';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { AddDialogComponent } from './../add-dialog/add-dialog.component';
import { NgRedux, select } from '@angular-redux/store';
import { MatDialog } from '@angular/material';
import { IAppState } from './../../interfaces/iapp-state';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @select() wallet$: Observable<Icurrency[]>;
  @select() exchangeRate$: Observable<number>;

  constructor(
    private _dataService:DataService, 
    private _dataStore:NgRedux<IAppState>,
    private _dialog:MatDialog,
    private _translate: TranslateService) { }

  ngOnInit() {
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
    this._translate.use(lang).subscribe(data =>{
      
    });
  }

}
