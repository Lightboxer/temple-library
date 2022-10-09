
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { instanceOfAppError, AppErrorCodes } from 'tinystock-models'
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar, private apiService: ApiService) { }

  subscriptions: Subscription[] = []

  showSimpleSnackBar(message: string) {
    this.snackBar.dismiss()
    this.snackBar.open(message, 'Okay', {
      duration: 5000
    })
  }

  getAppErrorMessage(appErrorCode: AppErrorCodes) {
    switch (appErrorCode) {
      case AppErrorCodes.MISSING_DIRECTORY:
        return 'The data directory is missing'
        break;
      case AppErrorCodes.CORRUPT_ENCRYPTED_JSON:
        return 'The encrypted file is not a valid JSON file'