
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ErrorService } from '../services/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnDestroy {

  @ViewChild('password') passwordElement: ElementRef;
  @ViewChild('dataDir') dataDirElement: ElementRef;

  constructor(private apiService: ApiService, private errorService: ErrorService, private router: Router, private location: Location) { }

  submitting = false

  configForm = new FormGroup({
    dataDir: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rememberPassword: new FormControl(false),
    host: new FormControl(''),
  });

  changePasswordForm = new FormGroup({
    newPassword: new FormControl('', Validators.required),
  })

  importForm = new FormGroup({
    itemsInput: new FormControl('', Validators.required),
    items: new FormControl('', Validators.required),
    transactionsInput: new FormControl('', Validators.required),
    transactions: new FormControl('', Validators.required)
  })

  needDataDir = true
  needPassword = true
  needNewPassword = true

  directoryExists = false

  subscriptions: Subscription[] = []

  ngOnInit() {
    this.subscriptions.push(this.configForm.controls['dataDir'].valueChanges.subscribe((value: string) => {
      this.needDataDir = (value.trim() == '')
    }))
    this.subscriptions.push(this.configForm.controls['password'].valueChanges.subscribe((value: string) => {
      this.needPassword = (value.length < this.apiService.minPasswordLength)
    }))
    this.subscriptions.push(this.changePasswordForm.controls['newPassword'].valueChanges.subscribe((value: string) => {
      this.needNewPassword = (value.length < this.apiService.minPasswordLength)
    }))
    this.subscriptions.push(this.apiService.dataDirValue.subscribe(dataDir => {
      this.configForm.controls['dataDir'].setValue(dataDir)
      setTimeout(() => {
        if (dataDir.trim().length == 0) {
          this.dataDirElement.nativeElement.focus()
          this.directoryExists = false
        }
        else {
          this.passwordElement.nativeElement.focus()
          this.directoryExists = true
        }
      })
    }))
    this.subscriptions.push(this.apiService.passwordValue.subscribe(password => {
      this.configForm.controls['password'].setValue(password)
    }))
    this.subscriptions.push(this.apiService.hostValue.subscribe(host => {
      this.configForm.controls['host'].setValue(host)
    }))
    this.subscriptions.push(this.apiService.rememberPasswordValue.subscribe(rememberPassword => {
      this.configForm.controls['rememberPassword'].setValue(rememberPassword)
    }))
  }

  save() {
    if (this.configForm.valid && this.configForm.controls['password'].value.length > this.apiService.minPasswordLength) {
      this.submitting = true
      this.apiService.configure(this.configForm.controls['host'].value?.trim(), this.configForm.controls['dataDir'].value?.trim(), this.configForm.controls['password'].value).then(() => {
        this.submitting = false