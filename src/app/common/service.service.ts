import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private _snackBar: MatSnackBar,public  dialog: MatDialog) {}

openSnackBar(message: string, action: string= "close") {
    this._snackBar.open(message, action, {
      duration: 2000,
     });
    }
}
