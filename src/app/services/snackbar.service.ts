import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSanckBar(message: string) {
    this._snackBar.open(message, 'X', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 2500,
    });
  }
}
