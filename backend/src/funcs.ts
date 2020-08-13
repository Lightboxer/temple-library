// Contains functions used by events.ts
// References functions from io.ts

import { Adjustment, AppError, AppErrorCodes, Item, Transaction, TransactionTypes } from 'tinystock-models'
import { readItems, readTransactions, writeItems, writeTransactions, createOrCheckDataDirectory, changeEncryptionPassword, validatePassword } from './io'

export function configure(dataDir: string, password: string) {
    return createOrCheckDataDirectory(dataDir, password)
}

export function items(dataDir: string, password: string) {
    return read