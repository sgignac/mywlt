import { Icurrency } from './../../interfaces/icurrency';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';


export interface IAddForm{
  code: string,
  amount: number,
  invested: number
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  editData:boolean = false;
  addForm: FormGroup;
  result = {
    success: false,
    data: {}
  };

  constructor(private _thisDialogRef: MatDialogRef<AddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:Icurrency) { 
    if(data){
      this.editData = true;
    }
  }

  ngOnInit() {
    this.addForm = new FormGroup({
      id: new FormControl(this.editData ? this.data.id : 0),
      code: new FormControl(this.editData ? this.data.code : '', [Validators.minLength(3), Validators.maxLength(5), Validators.required]),
      amount: new FormControl(this.editData ? this.data.amount : 0, [Validators.required]),
      invested: new FormControl(this.editData ? this.data.invested : 0, [Validators.required])
    });
  }
  
  onSubmit(form){
    form.value.code = form.value.code.toUpperCase();
    this.result.success = true;
    this.result.data = form.value;
    this._thisDialogRef.close(this.result);
  }

  cancelTheForm(){
    this.result.success = false;
    this.result.data = {};
    this._thisDialogRef.close(this.result);
  }

}
