import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Transaction, TransactionTypes } from 'tinystock-models';
import { ApiService } from '../services/api.service';
import { ErrorService } from '../services/error.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[] = []
  loading = false

  displayedTransactions = new BehaviorSubject(this.transactions)

  columnsToDisplay = ['date', 'items', 'adjustments', 'total']

  type: TransactionTypes = TransactionTypes.SALE;
  noun: string = ''
  verb: string = ''

  constructor(private apiService: ApiService, private errorService: ErrorS