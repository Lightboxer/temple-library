// Contains functions used by events.ts
// References functions from io.ts

import { Adjustment, AppError, AppErrorCodes, Item, Transaction, TransactionTypes } from 'tinystock-models'
import { readItems, readTransactions, writeItems, writeTransactions, createOrCh