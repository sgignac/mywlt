import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
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

  addForm: FormGroup;

  constructor(private _thisDialogRef: MatDialogRef<AddDialogComponent>) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      code: new FormControl('', [Validators.minLength(3), Validators.maxLength(5), Validators.required]),
      amount: new FormControl('', [Validators.required]),
      invested: new FormControl('', [Validators.required])
    });
  }
  
  onSubmit(form){
    form.value.code = form.value.code.toUpperCase();
    this._thisDialogRef.close(form.value);
  }

  cancelTheForm(){
    this._thisDialogRef.close();
  }

}
