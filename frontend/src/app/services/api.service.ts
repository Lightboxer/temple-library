
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Adjustment, AppError, AppErrorCodes, Item, Transaction, TransactionTypes } from 'tinystock-models'
import { IpcRenderer } from 'electron'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private ipc: IpcRenderer | undefined

  constructor(private http: HttpClient) {
    if (window.require) {
      console.log('Running as Electron client')
      this.ipc = window.require('electron').ipcRenderer
    } else {
      console.log('Running as Web client')
    }
  }

  minPasswordLength = 5

  electronWaitTime = 5000 // How many ms to wait for responses (only used in Electron mode, not when in a browser)

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  hostValue = new BehaviorSubject(this.host)