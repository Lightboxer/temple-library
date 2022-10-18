import { Injectable } from '@angular/core';
import { TransactionTypes } from 'tinystock-models';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getTransactionTypeVerb(type: TransactionTypes) {
    switch (type) {
      case TransactionTypes.SALE:
        return 'Sell'
        break;
      case TransactionTypes.PURCHASE:
        return 'Buy'
        break;
    }
  }

  getTransactionTypeNoun(type: TransactionTypes) {
    switch (type) {
      case TransactionTypes.SALE: