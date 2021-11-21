import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class Funcs {
  constructor(private snackbar: MatSnackBar) {}

  handleMessages(message: string) {
    this.snackbar.open(message, '', {
      duration: 2000,
    });
  }
}
