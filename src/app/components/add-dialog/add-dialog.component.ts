import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  constructor(private _thisDialogRef: MatDialogRef<AddDialogComponent>) { }

  ngOnInit() {
  }
  
  saveTheForm(){
    console.log('Save the form');
    this._thisDialogRef.close({});
  }

  cancelTheForm(){
    console.log('Cancel the form');
    this._thisDialogRef.close();
  }

}
