// Contains functions used by events.ts
// References functions from io.ts

import { Adjustment, AppError, AppErrorCodes, Item, Transaction, TransactionTypes } from 'tinystock-models'
import { readItems, readTransactions, writeItems, writeTransactions, createOrCheckDataDirectory, changeEncryptionPassword, validatePassword } from './io'

export function configure(dataDir: string, password: string) {
    return createOrCheckDataDirectory(dataDir, password)
}

export function items(dataDir: string, password: string) {
    return readItems(dataDir, password)
}

export function transactions(dataDir: string, password: string) {
    return readTransactions(dataDir, password)
}

export function findItem(dataDir: string, code: string, setQuantity: number | null, password: string) {
    let items = readItems(dataDir, password)
    let item = items.find(item => (item.code == code.trim() && item.setQuantity == setQuantity))
    if (!item) throw new AppError(AppErrorCodes.ITEM_NOT_FOUND, { code, setQuantity })
    return item
}

function findItemIndex(items: Item[], code: string, setQuantity: number | null) {
    let itemIndex = items.findIndex(item => (item.code == code.trim() && item.setQuantity == s