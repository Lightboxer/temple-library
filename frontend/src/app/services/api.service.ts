
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

  dataDirValue = new BehaviorSubject(this.dataDir)

  passwordValue = new BehaviorSubject(this.rememberPassword ? this.password : '')

  rememberPasswordValue = new BehaviorSubject(this.rememberPassword)

  set host(host: string | null) {
    this.hostValue.next(host)
    localStorage.setItem('host', host)
  }

  get host() {
    let host = localStorage.getItem('host')
    if (!host) return ''
    else return host
  }

  set dataDir(dataDir: string) {
    this.dataDirValue.next(dataDir)
    localStorage.setItem('dataDir', dataDir)
  }

  get dataDir() {
    let dataDir = localStorage.getItem('dataDir')
    if (!dataDir) return ''
    else return dataDir
  }

  set password(password: string) {
    this.passwordValue.next(password)
    if (this.rememberPassword) localStorage.setItem('password', password)
  }

  get password() {
    if (this.rememberPassword) {
      let password = localStorage.getItem('password')
      if (!password) return ''
      else return password
    } else return this.passwordValue.value
  }

  set rememberPassword(rememberPassword: boolean) {
    this.rememberPasswordValue.next(rememberPassword)
    localStorage.setItem('rememberPassword', JSON.stringify(rememberPassword))
    if (!rememberPassword) this.clearPassword()
  }

  get rememberPassword() {
    let rememberPassword = localStorage.getItem('rememberPassword')
    if (!rememberPassword) return false
    else return !!JSON.parse(rememberPassword)
  }

  clearPassword() {
    localStorage.removeItem('password')
  }

  // This client may run either in a Web browser or an Electron container
  // Therefore, requests to the 'backend' may either be Electron IPC requests or Web requests to a server
  // All below requests check for the presence of the Electron IPC variable and then use the appropriate method
  // The Web request version is used if the container is not Electron OR if the user has specified a host URL

  configure(host: string, dataDir: string, password: string) {
    const body = { dataDir, password }
    if (this.ipc && host?.trim().length == 0) {
      return new Promise<null>((resolve, reject) => {
        this.ipc.once('configureResponse', (event, response) => {
          resolve(response)
        })
        this.ipc.once('configureError', (event, error) => {
          reject(error)
        })
        this.ipc.send('configure', body)
        setTimeout(() => {
          reject(new AppError(AppErrorCodes.ELECTRON_TIME_OUT))
        }, this.electronWaitTime)
      })
    } else return this.http.post(host + '/api/configure', body).toPromise() as Promise<null>
  }

  items() {
    const body = { dataDir: this.dataDir, password: this.password }
    if (this.ipc && this.host?.trim().length == 0) {
      return new Promise<Item[]>((resolve, reject) => {
        this.ipc.once('itemsResponse', (event, response) => {
          resolve(response)
        })
        this.ipc.once('itemsError', (event, error) => {
          reject(error)
        })
        this.ipc.send('items', body)
        setTimeout(() => {
          reject(new AppError(AppErrorCodes.ELECTRON_TIME_OUT))
        }, this.electronWaitTime)
      })
    } else return this.http.post(this.host + '/api/items', body).toPromise() as Promise<Item[]>
  }

  transactions() {
    const body = { dataDir: this.dataDir, password: this.password }
    if (this.ipc && this.host?.trim().length == 0) {
      return new Promise<Transaction[]>((resolve, reject) => {
        this.ipc.once('transactionsResponse', (event, response) => {
          resolve(response)
        })
        this.ipc.once('transactionsError', (event, error) => {
          reject(error)
        })
        this.ipc.send('transactions', body)
        setTimeout(() => {
          reject(new AppError(AppErrorCodes.ELECTRON_TIME_OUT))
        }, this.electronWaitTime)
      })
    } else return this.http.post(this.host + '/api/transactions', body).toPromise() as Promise<Transaction[]>
  }

  addItem(item: Item) {
    if (typeof item.setQuantity == 'string') item.setQuantity = null
    const body = { dataDir: this.dataDir, password: this.password, item }
    if (this.ipc && this.host?.trim().length == 0) {
      return new Promise<null>((resolve, reject) => {
        this.ipc.once('addItemResponse', (event, response) => {
          resolve(response)
        })
        this.ipc.once('addItemError', (event, error) => {
          reject(error)
        })
        this.ipc.send('addItem', body)
        setTimeout(() => {
          reject(new AppError(AppErrorCodes.ELECTRON_TIME_OUT))
        }, this.electronWaitTime)
      })
    } else return this.http.post(this.host + '/api/addItem', body).toPromise() as Promise<null>
  }

  findItem(code: string, setQuantity: number | null) {