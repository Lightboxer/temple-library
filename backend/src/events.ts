// Contains functions directly accessed by main.ts
// References functions from funcs.ts

import { configure, addItem, findItem, addTransaction, editItem, deleteItem, changePassword, importData, items, transactions } from './funcs'
import { AppError, AppErrorCodes, instanceOfItem, instanceOfAdjustment, instanceOfItems, instanceOfTransactions, TransactionTypes } from 'tinystock-models'

export async function checkStandardArgs(obj: any) {
  if (obj.dataDir == undefined || obj.password == undefined) throw new AppError(AppErrorCodes.MISSING_ARGUMENT)
  if (typeof obj.dataDir != 'string' || typeof obj.password != 'string') throw new AppError(AppErrorCodes.INVALID_ARGUMENT)
  if (obj.password.length == 0) throw new AppError(AppErrorCodes.INVALID_ARGUMENT)
}

export async function configureEvent(body: any) {
  ch