import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  param = {
    code: ""
  };
  constructor(private _thisDialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:string ) { 
    this.param.code = data;
  }

  ngOnInit() {
  }

  confirm(result){
    this._thisDialogRef.close(result);
  }

}
